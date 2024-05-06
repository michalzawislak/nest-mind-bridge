import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';

@Controller('memory')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoryService.create(createMemoryDto);
  }

  @Get()
  findAll() {
    const memories = this.memoryService.findAll();
    return memories;
  }

  @Get(':uuid')
  findOne(@Param('uuid') id: string) {
    return this.memoryService.findOne(id);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoryService.update(uuid, updateMemoryDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.memoryService.remove(uuid);
  }
}
