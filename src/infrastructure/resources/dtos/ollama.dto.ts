export interface OllamaPayload {
  model: string;
  messages: Message[];
  stream: boolean;
  format: object;
}
export enum MessageRoles {
  USER = 'user',
  ASSISTANT = 'assistant',
}
export interface Message {
  role: MessageRoles;
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at: Date;
  message: Message;
  done_reason: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}
