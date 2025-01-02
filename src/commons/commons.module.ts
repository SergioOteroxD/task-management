import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import generalConfig from './config/general.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [generalConfig, databaseConfig],
      expandVariables: true,
    }),
  ],
})
export class CommonsModule {}
