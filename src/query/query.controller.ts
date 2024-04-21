import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { ConversationThreadService } from 'src/common/conversation-thread/conversation-thread.service';
import { Response } from 'express';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService, private readonly conversationThreadService: ConversationThreadService) {}

  @Post()
  @Header('thread-id', 'none')
  async create(@Body() createQueryDto: CreateQueryDto, @Res({ passthrough: true }) res: Response) {
    let threadId: string;
    
    if (!createQueryDto.threadId) {
      threadId = this.conversationThreadService.createThread();
    } else {
      threadId = createQueryDto.threadId;
    }
    
    this.conversationThreadService.addUserQuery(threadId, createQueryDto.query);
    const responseData = await this.queryService.createQuery(createQueryDto);
    
    res.status(201).header('Thread-id', threadId).json(responseData);
  }
}
