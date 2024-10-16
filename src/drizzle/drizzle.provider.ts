import { Provider } from '@nestjs/common';
import * as postgres from 'postgres';
import {
  DrizzleModuleAsyncOptions,
  DrizzleModuleOptions,
} from './drizzle.interface';
import { DRIZZLE_CONNECTION, DRIZZLE_OPTIONS } from './drizzle.const';

export function createDrizzleAsyncProviders(
  options: DrizzleModuleAsyncOptions,
): Provider[] {
  const providers: Provider[] = [
    {
      provide: DRIZZLE_CONNECTION,
      useFactory: (drizzleOptions: DrizzleModuleOptions) => {
        return postgres(drizzleOptions.databaseUrl);
      },
      inject: [DRIZZLE_OPTIONS],
    },
  ];

  if (options.useFactory) {
    providers.push({
      provide: DRIZZLE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  return providers;
}
