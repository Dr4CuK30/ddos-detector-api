export interface AddLogsDto {
  logs: string;
  id: string;
}

export interface AddLogsResponse {
  probability: number;
  justification: string;
}
