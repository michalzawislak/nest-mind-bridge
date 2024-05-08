import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { getMemoryService, getQdrantService } from "src/register-services";

export const memories = async (userMessage: string) => {
  const memoryService = getMemoryService();
  const qdrantService = getQdrantService();
  const searchResult = await qdrantService.searchCollection(userMessage);
  const uuids = searchResult.map(obj => obj.payload.uuid);
  const mention = await memoryService.findOne(uuids[0] as string);
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });
  
  const { content } = await model.invoke([
    new SystemMessage(`
    Based on the user's query, answer the user's question. Use the user information below to answer, if the information is not enough answer that you do not know the answer to the query.
    ###User memories
    ${mention.content}
    `),
    new HumanMessage(`${userMessage}`)
  ]);
  return content.toString();
};