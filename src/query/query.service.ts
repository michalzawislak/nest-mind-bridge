import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { LangchainApiService } from 'src/common/langchain-api/langchain-api.service';
import { tools } from 'src/common/helpers/tools.helper';
import { ConversationThreadService } from 'src/common/conversation-thread/conversation-thread.service';

@Injectable()
export class QueryService {
  constructor(private readonly langchainApiService: LangchainApiService, private readonly conversationThreadService: ConversationThreadService) {}

  async createQuery(createQueryDto: CreateQueryDto) {
    const threadId = this.conversationThreadService.getCurrentThreadId();
    const intention = await this.langchainApiService.getIntention(createQueryDto.query);
    this.conversationThreadService.addUserQuery(threadId, createQueryDto.query);
    if (intention && tools[intention.args.category]) {
			const result = await tools[intention.args.category](createQueryDto.query);
      this.conversationThreadService.addAIResponse(threadId, result);
			return result;
    } else {
        console.log(intention);
    }
    return 'Action undefined';
  }
}
