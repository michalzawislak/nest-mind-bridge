import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConversationThreadService } from './common/conversation-thread/conversation-thread.service';
import { registerConversationThreadService, registerMemoryService } from './register-services';
import { MemoryService } from './memory/memory.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const conversationThreadService = app.get(ConversationThreadService);
  const memoryService = app.get(MemoryService);
  registerConversationThreadService(conversationThreadService);
  registerMemoryService(memoryService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
