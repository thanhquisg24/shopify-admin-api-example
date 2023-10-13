import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiTags } from '@nestjs/swagger';
import {
  ZaloShippedDTO,
  ZaloThanksCustomerDTO,
  ZaloZnsDTO,
  ZaloZnsShipment,
} from './dto/zalo-zns-dto';
import { ZaloHookService } from './zalo-hook.service';

@ApiTags('Zalo hook')
@Controller('api/v1/zalo-hook')
export class ZaloHookController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly service: ZaloHookService,
  ) {}

  @Get()
  getHello(): string {
    // this.logger.log('Calling getHello()', AppController.name);
    // this.logger.error('Calling getHello()', AppController.name);
    // this.logger.debug('Calling getHello()', AppController.name);
    // this.logger.verbose('Calling getHello()', AppController.name);
    this.logger.warn('Calling getHello()', ZaloHookController.name);
    return 'ssss';
  }
  @Post('post-zalo-zns-thanks-customer')
  postSendZnsThanksCustomer(@Body() zaloZnsPayload: ZaloThanksCustomerDTO) {
    return this.service.sendZnsThanksCustomer(zaloZnsPayload);
  }

  @Post('post-zalo-zns-shipped')
  postSendZnsShipped(@Body() zaloZnsPayload: ZaloShippedDTO) {
    return this.service.sendZnsShipped(zaloZnsPayload);
  }

  @Post('post-zalo-zns-package-shipped-285273')
  postSendZnsPackageShipped(@Body() zaloZnsPayload: ZaloZnsShipment) {
    return this.service.sendZnsPackageShipped_285273(zaloZnsPayload);
  }

  @Post('post-zalo-zns-order-shipping-284910')
  postSendZnsOrderShipping(@Body() zaloZnsPayload: ZaloZnsShipment) {
    return this.service.sendZnsOrderShipping_284910(zaloZnsPayload);
  }

  @Post('post-zalo-zns')
  postSendZaloZns(@Body() zaloZnsPayload: ZaloZnsDTO) {
    return this.service.sendZaloZns(zaloZnsPayload);
  }
}
