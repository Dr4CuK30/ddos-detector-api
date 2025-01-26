import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Message, OllamaPayload, OllamaResponse } from './dtos/ollama.dto';

@Injectable()
export class OllamaResource {
  private OLLAMA_API_URL = 'http://localhost:11434/api';
  constructor() {}
  async chatWithOllama(messages: Message[]): Promise<OllamaResponse> {
    const res = await axios.post(
      `${this.OLLAMA_API_URL}/chat`,
      this.buildDefaultChatTemplate(messages),
    );
    return res.data;
  }

  private buildDefaultChatTemplate(messages: Message[]): OllamaPayload {
    return {
      model: 'llama3.2',
      messages: messages,
      stream: false,
      format: {
        type: 'object',
        properties: {
          probability: {
            type: 'integer',
          },
          justification: {
            type: 'string',
          },
        },
        required: ['probability', 'justification'],
      },
    };
  }
}
