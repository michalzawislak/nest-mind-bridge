import { ConversationThreadService } from "./common/conversation-thread/conversation-thread.service";
import { MemoryService } from "./memory/memory.service";

let conversationThreadService: ConversationThreadService;
let memoryService: MemoryService;
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
