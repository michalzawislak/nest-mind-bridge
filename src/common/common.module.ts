import { Module } from '@nestjs/common';
import { OpenaiApiModule } from './openai-api/openai-api.module';
import { OpenaiApiService } from './openai-api/openai-api.service';
import { LangchainApiModule } from './langchain-api/langchain-api.module';
import { LangchainApiService } from './langchain-api/langchain-api.service';

@Module({
  imports: [OpenaiApiModule, LangchainApiModule],
  providers: [OpenaiApiService, LangchainApiService],
})
export class CommonModule {}
