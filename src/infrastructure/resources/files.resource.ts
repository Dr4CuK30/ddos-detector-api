import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FilesResource {
  async generateJsonFile(filename: string, data: any): Promise<string> {
    const name = `${filename}.json`;
    const filePath = join(__dirname, '../../../static/chats', name);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return name;
  }

  async getJsonFileContent(filename: string): Promise<any> {
    const filePath = join(
      __dirname,
      '../../../static/chats',
      `${filename}.json`,
    );
    const fileContent = await readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
}
