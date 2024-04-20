import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { OpenaiApiService } from 'src/common/openai-api/openai-api.service';
import { LangchainApiService } from 'src/common/langchain-api/langchain-api.service';

@Module({
  controllers: [QueryController],
  providers: [QueryService, OpenaiApiService, LangchainApiService],
})
export class QueryModule {}
