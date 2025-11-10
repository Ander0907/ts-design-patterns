import { COLORS } from '../../helpers/colors.ts';

export class LocalLogger {
  constructor(private file: string) {}

  writeLog(message: string): void {
    console.log(`[${this.file}] ${message}`);
  }

  writeWarnLog(message: string): void {
    console.log(`[${this.file}] %c${message}`, COLORS.yellow);
  }

  writeErrorLog(message: string): void {
    console.log(`[${this.file}] %c${message}`, COLORS.red);
  }
}
