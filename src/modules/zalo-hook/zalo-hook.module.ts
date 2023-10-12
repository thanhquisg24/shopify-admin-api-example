import { Module } from '@nestjs/common';
import { ZaloHookController } from './zalo-hook.controller';
import { ZaloHookService } from './zalo-hook.service';
import { ZaloScheduleService } from './zalo-schedule.service';

@Module({
  controllers: [ZaloHookController],
  providers: [ZaloHookService],
  exports: [ZaloHookService],
})
export class ZaloHookModule {}
