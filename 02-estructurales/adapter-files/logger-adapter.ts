import { Logger } from 'jsr:@deno-library/logger';
import { COLORS } from '../../helpers/colors.ts';

interface ILoggerAdapter {
  file: string;
  writeLog(message: string): void;
  writeWarnLog(message: string): void;
  writeErrorLog(message: string): void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  public writeLog(message: string): void {
    this.logger.info(`[${this.file}] ${message}`);
  }

  public writeWarnLog(message: string): void {
    this.logger.warn(`[${this.file}] %c${message}`, COLORS.yellow);
  }

  public writeErrorLog(message: string): void {
    this.logger.error(`[${this.file}] %c${message}`, COLORS.red);
  }
}
