import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { DrizzleModuleAsyncOptions } from './drizzle.interface';
import { DrizzleService } from './drizzle.service';
import { createDrizzleAsyncProviders } from './drizzle.provider';
import { DrizzleLogger } from '@/drizzle/drizzle.logger';

@Module({})
@Global()
export class DrizzleModule {
  static forRootAsync(options: DrizzleModuleAsyncOptions): DynamicModule {
    const providers = createDrizzleAsyncProviders(options);
    return {
      imports: options.imports,
      module: DrizzleModule,
      providers: [...providers, DrizzleService, DrizzleLogger, Logger],
      exports: [DrizzleService],
    };
  }
}
