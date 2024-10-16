import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_CONNECTION } from './drizzle.const';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import * as schema from './schema';
import { DrizzleLogger } from '@/drizzle/drizzle.logger';
@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DRIZZLE_CONNECTION) private readonly conn: Sql,
    private readonly drizzleLogger: DrizzleLogger,
  ) {}

  getClient() {
    return drizzle(this.conn, { schema, logger: this.drizzleLogger });
  }
}
