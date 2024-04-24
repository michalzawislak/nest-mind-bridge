import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConversationThreadService } from './common/conversation-thread/conversation-thread.service';
import { registerConversationThreadService } from './register-services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const conversationThreadService = app.get(ConversationThreadService);
  registerConversationThreadService(conversationThreadService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
