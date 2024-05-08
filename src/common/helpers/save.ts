import { ChatOpenAI } from "@langchain/openai";
import { structureUserMessage } from "../prompts/structure-user-message";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { getMemoryService, getQdrantService } from "src/register-services";
import { v4 as uuidv4 } from "uuid";
import { CreateMemoryDto, SourceType } from "src/memory/dto/create-memory.dto";
import { confirmMemorySave } from "../prompts/confirm-memory-save";
import { StructuredUserMessage } from "../models/structured-user-message";

export const save = async (userMessage: string) => {
  const memoryService = getMemoryService();
  const qdrantService = getQdrantService();

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });
  
  const { content } = await model.invoke([
    new SystemMessage(`${structureUserMessage}`),
    new HumanMessage(`${userMessage}`)
  ]);
  let structuredUserMessage = JSON.parse(content.toString()) as StructuredUserMessage;
  
  const confirmation = await model.invoke([
    new SystemMessage(`${confirmMemorySave}`),
    new HumanMessage(`${userMessage}`)
  ]);
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
  return confirmation.content.toString();
};