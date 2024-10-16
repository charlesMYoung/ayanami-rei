import { Logger } from 'drizzle-orm';
import { Logger as NestLogger } from '@nestjs/common';

export class DrizzleLogger implements Logger {
  private logger = new NestLogger('sql');
  logQuery(query: string, params: unknown[]): void {
    this.logger.debug(query);
    this.logger.debug('params:' + JSON.stringify(params));
  }
}
