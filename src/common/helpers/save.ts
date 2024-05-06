import { ChatOpenAI } from "@langchain/openai";
import { structureUserMessage } from "../prompts/structure-user-message";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { getMemoryService } from "src/register-services";
import { v4 as uuidv4 } from "uuid";
import { SourceType } from "src/memory/dto/create-memory.dto";
import { confirmMemorySave } from "../prompts/confirm-memory-save";

export interface StructuredUserMessage {
  content: string;
  type: string;
  source: string;
}

export const save = async (userMessage: string) => {
  const memoryService = getMemoryService();
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });
  console.log('Structuring  user message...')
  const { content } = await model.invoke([
    new SystemMessage(`${structureUserMessage}`),
    new HumanMessage(`${userMessage}`)
  ]);
  let c = JSON.parse(content.toString()) as StructuredUserMessage;
  
  const confirmation = await model.invoke([
    new SystemMessage(`${confirmMemorySave}`),
    new HumanMessage(`${userMessage}`)
  ]);
  console.log({
    uuid: uuidv4(),
    content: c.content,
    type: c.type,
    source: c.source as SourceType,
    created_at: new Date().toISOString(),
    synced: false,
    update: false,
  });
  
  memoryService.create({
    uuid: uuidv4(),
    content: c.content,
    type: c.type,
    source: c.source as SourceType,
    created_at: new Date().toISOString(),
    synced: false,
    update: false,
  });

  return confirmation.content.toString();
};