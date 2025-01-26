import { Module } from '@nestjs/common';
import { OllamaResource } from './ollama.resource';
import { FilesResource } from './files.resource';

@Module({
  providers: [OllamaResource, FilesResource],
  exports: [OllamaResource, FilesResource],
})
export class ResourcesModule {}
