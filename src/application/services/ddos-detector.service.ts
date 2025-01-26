import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OllamaResource } from '../../infrastructure/resources/ollama.resource';
import { FilesResource } from '../../infrastructure/resources/files.resource';
import {
  Message,
  MessageRoles,
} from 'src/infrastructure/resources/dtos/ollama.dto';
import { readFile } from 'fs/promises';
import { join } from 'path';
import {
  AddLogsDto,
  AddLogsResponse,
} from 'src/infrastructure/controllers/dtos/ddos-detector.dto';

@Injectable()
export class DdosDetectorService {
  constructor(
    private readonly ollamaResource: OllamaResource,
    private readonly filesResource: FilesResource,
  ) {}
  async startScan(): Promise<string> {
    const id = uuidv4();
    const initialMessage = {
      role: MessageRoles.USER,
      content: await this.getPromptTemplate(),
    };
    const ollamaRes = await this.ollamaResource.chatWithOllama([
      initialMessage,
    ]);
    this.filesResource.generateJsonFile(id, [
      initialMessage,
      ollamaRes.message,
    ]);
    return id;
  }

  async getPromptTemplate(): Promise<string> {
    const filePath = join(__dirname, '../../../static/prompt_template_v1.txt');
    return await readFile(filePath, 'utf8');
  }

  async addLogs({ logs, id }: AddLogsDto): Promise<AddLogsResponse> {
    const chatLogs: Message[] = await this.filesResource.getJsonFileContent(id);
    const newMessage: Message = { content: logs, role: MessageRoles.USER };
    chatLogs.push(newMessage);
    const ollamaRes = await this.ollamaResource.chatWithOllama(chatLogs);
    chatLogs.push(ollamaRes.message);
    await this.filesResource.generateJsonFile(id, chatLogs);
    return JSON.parse(ollamaRes.message.content) as AddLogsResponse;
  }
}
