import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_CONNECTION } from './drizzle.const';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';
import { DrizzleLogger } from '@/drizzle/drizzle.logger';
@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DRIZZLE_CONNECTION) private readonly conn: Pool,
    private readonly drizzleLogger: DrizzleLogger,
  ) {}

  getClient() {
    return drizzle({
      client: this.conn,
      schema,
      logger: this.drizzleLogger,
    });
  }
}
