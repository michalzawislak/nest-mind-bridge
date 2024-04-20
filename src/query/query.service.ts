import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { LangchainApiService } from 'src/common/langchain-api/langchain-api.service';

@Injectable()
export class QueryService {
  constructor(private readonly langchainApiService: LangchainApiService) {}

  createQuery(createQueryDto: CreateQueryDto) {
    return this.langchainApiService.getIntention(createQueryDto.query);
  }
}
