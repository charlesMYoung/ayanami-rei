import { ModuleMetadata } from '@nestjs/common';
import { Type } from '@nestjs/common';

export type DATABASE_URL = string;

export interface DrizzleModuleOptions {
  databaseUrl: DATABASE_URL;
}

export interface DrizzleModuleOptionsFactory {
  createWinstonModuleOptions():
    | Promise<DrizzleModuleOptions>
    | DrizzleModuleOptions;
}

export interface DrizzleModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<DrizzleModuleOptions> | DrizzleModuleOptions;
  inject?: any[];
  useClass?: Type<DrizzleModuleOptionsFactory>;
}
