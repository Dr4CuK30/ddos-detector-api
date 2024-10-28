import { Controller, Get } from '@nestjs/common';
import { DdosDetectorService } from '../../application/services/ddos-detector.service';

@Controller()
export class DdosDetectorController {
  constructor(private readonly appService: DdosDetectorService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
