import { structureUserMessage } from "../prompts/structure-user-message";
import { getMemoryService, getOpenAiService, getQdrantService } from "src/register-services";
import { v4 as uuidv4 } from "uuid";
import { CreateMemoryDto, SourceType } from "src/memory/dto/create-memory.dto";
import { confirmMemorySave } from "../prompts/confirm-memory-save";
import { StructuredUserMessage } from "../models/structured-user-message";

export const save = async (userMessage: string) => {
  const memoryService = getMemoryService();
  const qdrantService = getQdrantService();
  const openaiApiService = getOpenAiService();
  const completion = await openaiApiService.getCompletion(
    `${structureUserMessage}`,
    `${userMessage}`
  );
  let structuredUserMessage = JSON.parse(completion) as StructuredUserMessage;
  const confirmation = await openaiApiService.getCompletion(
    `${confirmMemorySave}`,
    `${userMessage}`
  );

  const message: CreateMemoryDto = {
    uuid: uuidv4(),
    content: structuredUserMessage.content,
    type: structuredUserMessage.type,
    source: structuredUserMessage.source as SourceType,
    created_at: new Date().toISOString(),
    synced: false,
    update: false,
  }
  
  memoryService.create(message);
  qdrantService.addDocumentToCollection(message);
  return confirmation;
};