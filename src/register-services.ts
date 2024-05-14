import { ConversationThreadService } from "./common/conversation-thread/conversation-thread.service";
import { OpenaiApiService } from "./common/openai-api/openai-api.service";
import { QdrantService } from "./common/qdrant/qdrant.service";
import { MemoryService } from "./memory/memory.service";

let conversationThreadService: ConversationThreadService;
let memoryService: MemoryService;
let qdrantService: QdrantService;
let openaiApiService: OpenaiApiService;

export function registerConversationThreadService(service: ConversationThreadService) {
  conversationThreadService = service;
}

export function getConversationThreadService(): ConversationThreadService {
  return conversationThreadService;
}

export function registerMemoryService(service: MemoryService) {
  memoryService = service;
}

export function getMemoryService(): MemoryService {
  return memoryService;
}

export function registerQdrantService(service: QdrantService) {
  qdrantService = service;
}

export function getQdrantService(): QdrantService {
  return qdrantService;
}

export function registerOpenAiService(service: OpenaiApiService) {
  openaiApiService = service;
}

export function getOpenAiService(): OpenaiApiService {
  return openaiApiService;
}