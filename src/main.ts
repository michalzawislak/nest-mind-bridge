import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConversationThreadService } from './common/conversation-thread/conversation-thread.service';
import { registerConversationThreadService, registerMemoryService, registerOpenAiService, registerQdrantService } from './register-services';
import { MemoryService } from './memory/memory.service';
import { QdrantService } from './common/qdrant/qdrant.service';
import { OpenaiApiService } from './common/openai-api/openai-api.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const conversationThreadService = app.get(ConversationThreadService);
  const memoryService = app.get(MemoryService);
  const qdrantService = app.get(QdrantService);
  const openaiApiService = app.get(OpenaiApiService);
  registerConversationThreadService(conversationThreadService);
  registerMemoryService(memoryService);
  registerQdrantService(qdrantService);
  registerOpenAiService(openaiApiService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
