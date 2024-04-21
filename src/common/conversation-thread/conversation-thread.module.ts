import { Module } from '@nestjs/common';
import { ConversationThreadService } from './conversation-thread.service';

@Module({
  providers: [ConversationThreadService]
})
export class ConversationThreadModule {}
