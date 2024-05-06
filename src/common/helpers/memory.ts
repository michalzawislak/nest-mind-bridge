import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { getMemoryService } from "src/register-services";

export const memories = async (userMessage: string) => {
  console.log('Memory helper');
  const memoryService = getMemoryService();
  const memories = await memoryService.findAll();
  const userMemories = memories.map((memory) => memory.content);
  
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });
  
  const { content } = await model.invoke([
    new SystemMessage(`
    Based on the user's query, answer the user's question. Use the user information below to answer, if the information is not enough answer that you do not know the answer to the query.
    ###User memories
    ${userMemories.join(' ')}
    `),
    new HumanMessage(`${userMessage}`)
  ]);
  return content.toString();
};