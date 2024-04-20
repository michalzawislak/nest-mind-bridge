import { Controller, Post, Body } from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  create(@Body() createQueryDto: CreateQueryDto) {
    return this.queryService.createQuery(createQueryDto);
  }
}
