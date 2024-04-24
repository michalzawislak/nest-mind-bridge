import { Module } from '@nestjs/common';
import { OpenaiApiService } from './openai-api/openai-api.service';
import { LangchainApiService } from './langchain-api/langchain-api.service';
import { ConversationThreadService } from './conversation-thread/conversation-thread.service';

@Module({
  providers: [OpenaiApiService, LangchainApiService, ConversationThreadService],
  exports: [OpenaiApiService, LangchainApiService, ConversationThreadService],
})
export class CommonModule {}
