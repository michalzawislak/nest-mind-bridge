import { Module } from '@nestjs/common';
import { LangchainApiService } from './langchain-api.service';

@Module({
  providers: [LangchainApiService]
})
export class LangchainApiModule {}
