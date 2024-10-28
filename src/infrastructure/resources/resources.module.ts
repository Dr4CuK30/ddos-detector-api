import { Module } from '@nestjs/common';
import { OllamaResource } from './ollama.resource';

@Module({
  providers: [OllamaResource],
  exports: [OllamaResource],
})
export class ResourcesModule {}
