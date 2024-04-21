import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { ConversationThreadService } from 'src/common/conversation-thread/conversation-thread.service';
import { Response } from 'express';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService, private readonly conversationThreadService: ConversationThreadService) {}

  @Post()
  async create(@Body() createQueryDto: CreateQueryDto, @Res({ passthrough: true }) res: Response) {
    let threadId = createQueryDto.threadId;
    const threadExists = this.conversationThreadService.threadExists(threadId);
    const responseData = await this.queryService.createQuery(createQueryDto);
    
    if(threadExists) {
      this.conversationThreadService.addUserQuery(threadId, createQueryDto.query);
      res.status(201).json(responseData);
    } else {
      threadId = this.conversationThreadService.createThread();
      res.status(201).header('Thread-id', threadId).json(responseData);
    }
  
    
    
  }
}
