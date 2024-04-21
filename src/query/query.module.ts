import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { OpenaiApiService } from 'src/common/openai-api/openai-api.service';
import { LangchainApiService } from 'src/common/langchain-api/langchain-api.service';
import { ConversationThreadService } from 'src/common/conversation-thread/conversation-thread.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [QueryController],
  providers: [QueryService, OpenaiApiService, LangchainApiService, ConversationThreadService],
})
export class QueryModule {}
