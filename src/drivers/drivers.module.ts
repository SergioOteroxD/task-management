import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IjwtDriver } from './jwt/jwt.driver';
import { JwtDriver } from './jwt/impl/jwt.driver.impl';

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
    MongooseModule.forFeature([]),
  ],
  providers: [
    //Jwt
    { provide: IjwtDriver, useClass: JwtDriver },
  ],
  exports: [
    // JWT
    IjwtDriver,
  ],
})
export class DriversModule {}
