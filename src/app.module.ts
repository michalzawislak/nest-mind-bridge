import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from './common/common.module';
import { QueryModule } from './query/query.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [ConfigModule.forRoot(), TerminusModule, HttpModule, CommonModule, QueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
