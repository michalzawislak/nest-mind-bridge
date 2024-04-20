import { Module } from '@nestjs/common';
import { OpenaiApiService } from './openai-api.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [OpenaiApiService, ConfigService],
})
export class OpenaiApiModule {}
