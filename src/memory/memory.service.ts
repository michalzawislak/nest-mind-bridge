import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './entities/memory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private memoryRepository: Repository<Memory>,
  ) {}

  create(createMemoryDto: CreateMemoryDto) {
    console.log(createMemoryDto);
    const newMemory = { ...createMemoryDto };
    return this.memoryRepository.save(newMemory).then((res) => {res});
  }

  async findAll(): Promise<Memory[]> {
    return this.memoryRepository.find();
  }

  async findOne(uuid: string): Promise<Memory | null> {
    const memory = await this.memoryRepository.findOne({ where: { uuid } });
    if (!memory) {
      throw new NotFoundException(`UUID ${uuid} not found`);
    }
    return memory;
  }

  async update(uuid: string, updateMemoryDto: UpdateMemoryDto): Promise<Memory> {
    const memory = await this.memoryRepository.findOne({ where: { uuid } });
    if (!memory) {
      throw new NotFoundException(`UUID ${uuid} not found`);
    }
    
    Object.assign(memory, updateMemoryDto);

    return await this.memoryRepository.save(memory);
  }

  async remove(uuid: string): Promise<void> {
    const memory = await this.memoryRepository.findOne({ where: { uuid } });
    if (!memory) {
      throw new NotFoundException(`UUID ${uuid} not found`);
    }

    await this.memoryRepository.remove(memory);
  }
}
