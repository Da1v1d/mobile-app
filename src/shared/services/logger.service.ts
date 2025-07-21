import { APP_PREFIX } from '../constants/app';

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
  private logLevel: LogLevel = __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR;
  private prefix: string = APP_PREFIX;

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `${this.prefix} [${timestamp}] [${level}] ${message}${contextStr}`;
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

  // Specialized logging methods
  api(method: string, url: string, status?: number, duration?: number): void {
    const context = { method, url, status, duration };
    if (status && status >= 400) {
      this.error(`API ${method} ${url} failed with status ${status}`, undefined, context);
    } else {
      this.info(`API ${method} ${url} ${status || 'pending'}`, context);
    }
  }

  navigation(from: string, to: string): void {
    this.debug(`Navigation: ${from} → ${to}`);
  }

  performance(operation: string, duration: number): void {
    this.debug(`Performance: ${operation} took ${duration}ms`);
  }

  userAction(action: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, context);
  }

  // Group logging for related operations
  group(label: string, callback: () => void): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.group(`${this.prefix} ${label}`);
      callback();
      console.groupEnd();
    }
  }

  // Table logging for structured data
  table(data: any[], title?: string): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      if (title) {
        console.log(`${this.prefix} ${title}:`);
      }
      console.table(data);
    }
  }
}

// Export singleton instance
export const LoggerService = new LoggerServiceInstance();
