import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { CommonModule } from 'src/common/common.module';
import { MemoryModule } from 'src/memory/memory.module';

@Module({
  imports: [CommonModule, MemoryModule],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}
