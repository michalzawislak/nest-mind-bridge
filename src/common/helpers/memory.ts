import { getMemoryService, getOpenAiService, getQdrantService } from "src/register-services";

export const memories = async (userMessage: string) => {
  const memoryService = getMemoryService();
  const qdrantService = getQdrantService();
  const openaiApiService = getOpenAiService();
  const searchResult = await qdrantService.searchCollection(userMessage, 5);
  const uuids = searchResult.map(obj => obj.payload.uuid);
  const mentiones = searchResult.map(obj => `### ${obj.payload.content} - ${obj.payload.created_at} ###`);
  const mention = await memoryService.findOne(uuids[0] as string);
  const mentionesString = mentiones.join(", ");
  const completion = await openaiApiService.getCompletion(
    `
    Based on the user's query, answer the user's question. Use the user information below to answer, if the information is not enough answer that you do not know the answer to the query.
    ###User memories in format: memory - date of creation###
    ${mentionesString}

    ### General context
    Date: ${new Date().toISOString()}
    `,
    `${userMessage}`
  );
  
  return completion;
};