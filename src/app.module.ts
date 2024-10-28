import { Module } from '@nestjs/common';
import { DdosDetectorController } from './infrastructure/controllers/ddos-detector.controller';
import { DdosDetectorService } from './application/services/ddos-detector.service';
import { ResourcesModule } from './infrastructure/resources/resources.module';

@Module({
  imports: [ResourcesModule],
  controllers: [DdosDetectorController],
  providers: [DdosDetectorService],
})
export class AppModule {}
