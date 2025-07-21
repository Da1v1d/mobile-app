import { IS_DEV } from '@/shared/constants/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogContext {
  [key: string]: any;
}

class LoggerServiceInstance {
  private logLevel: LogLevel = IS_DEV ? LogLevel.DEBUG : LogLevel.ERROR;

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.logLevel <= LogLevel.ERROR) {
      const errorStr = error instanceof Error ? error.stack : String(error);
      const fullContext = { ...context, error: errorStr };
      console.error(this.formatMessage('ERROR', message, fullContext));
    }
  }

  log(context?: LogContext): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.log(this.formatMessage('LOG', '', context));
    }
  }
}

// Export singleton instance
export const LoggerService = new LoggerServiceInstance();
