import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import DailyRotateFile from 'winston-daily-rotate-file';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ZaloHookModule } from './modules/zalo-hook/zalo-hook.module';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();
// import entities from './config/typeorm.entities';
const ENV = process.env.NODE_ENV;
const logTransportDaily = (
  name: string,
  level: 'info' | 'warn' | 'error',
): DailyRotateFile => {
  return new DailyRotateFile({
    level,
    filename: `log/${name}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),

    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      transports: [
        new winston.transports.Console(),
        logTransportDaily('system', 'info'),
        logTransportDaily('err', 'error'),
      ],
    }),
    EventEmitterModule.forRoot(),
    ZaloHookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
