import { Module } from '@nestjs/common';
import { OpenaiApiModule } from './openai-api/openai-api.module';
import { OpenaiApiService } from './openai-api/openai-api.service';
import { LangchainApiModule } from './langchain-api/langchain-api.module';
import { LangchainApiService } from './langchain-api/langchain-api.service';
import { ConversationThreadModule } from './conversation-thread/conversation-thread.module';
import { ConversationThreadService } from './conversation-thread/conversation-thread.service';

@Module({
  providers: [OpenaiApiService, LangchainApiService, ConversationThreadService],
  exports: [OpenaiApiService, LangchainApiService, ConversationThreadService],
})
export class CommonModule {}
