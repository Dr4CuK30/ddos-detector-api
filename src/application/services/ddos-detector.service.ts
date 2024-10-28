import { Injectable } from '@nestjs/common';

@Injectable()
export class DdosDetectorService {
  getHello(): string {
    return 'Hello World!';
  }
}
