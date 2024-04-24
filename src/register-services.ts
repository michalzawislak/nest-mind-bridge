import { ConversationThreadService } from "./common/conversation-thread/conversation-thread.service";

let conversationThreadService: ConversationThreadService;
export function registerConversationThreadService(service: ConversationThreadService) {
  conversationThreadService = service;
}

export function getConversationThreadService(): ConversationThreadService {
  return conversationThreadService;
}