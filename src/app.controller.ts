import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @HealthCheck()
  check() {
    return { status: 'ok' };
  }
}
