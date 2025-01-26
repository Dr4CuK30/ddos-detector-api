import { Body, Controller, Post } from '@nestjs/common';
import { DdosDetectorService } from '../../application/services/ddos-detector.service';
import { AddLogsDto, AddLogsResponse } from './dtos/ddos-detector.dto';

@Controller()
export class DdosDetectorController {
  constructor(private readonly appService: DdosDetectorService) {}

  @Post('start-scan')
  startScan(): Promise<string> {
    return this.appService.startScan();
  }

  @Post('add-logs')
  addLogs(@Body() body: AddLogsDto): Promise<AddLogsResponse> {
    return this.appService.addLogs(body);
  }
}
