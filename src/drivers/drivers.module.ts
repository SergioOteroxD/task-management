import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IjwtDriver } from './jwt.driver';
import { JwtDriver } from './impl/jwt.driver.impl';
import { Task, TaskSchema } from './model/task.model';
import { ItaskDriver } from './task.driver';
import { TaskDriver } from './impl/task.driver.impl';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('general.SECRET_JWT'),
        signOptions: { expiresIn: config.get<string>('general.EXPIRES_JWT') },
        global: true,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongo_uri'),
      }),
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [
    // Task
    { provide: ItaskDriver, useClass: TaskDriver },
    //Jwt
    { provide: IjwtDriver, useClass: JwtDriver },
  ],
  exports: [
    // Task
    ItaskDriver,
    // JWT
    IjwtDriver,
  ],
})
export class DriversModule {}
