import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { ConversationThreadService } from 'src/common/conversation-thread/conversation-thread.service';
import { Response } from 'express';
import { MemoryService } from 'src/memory/memory.service';

@Controller('query')
export class QueryController {
  constructor(
    private readonly queryService: QueryService,
    private readonly memoryService: MemoryService, 
    private readonly conversationThreadService: ConversationThreadService
  ) {}

  @Post()
  async create(@Body() createQueryDto: CreateQueryDto, @Res({ passthrough: true }) res: Response) {
    let threadId = createQueryDto.threadId;
    const threadExists = this.conversationThreadService.threadExists(threadId);
    
    if(!threadExists) {
      threadId = this.conversationThreadService.createThread();
    }
    this.conversationThreadService.setCurrentThreadId(threadId);
    const responseData = await this.queryService.createQuery(createQueryDto);
    res.status(201).header('Thread-id', threadId).json(responseData);
  }
}
