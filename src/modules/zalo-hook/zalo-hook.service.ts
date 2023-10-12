import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import AxiosIns from 'src/common/axios-custom/axios-ins';
import { getNewUUid } from 'src/common/utils/hash-util';
import {
  IZaloThanksCustomerDTO,
  IZaloZnsShipment,
  ZaloShippedDTO,
} from './dto/zalo-zns-dto';
import {
  I2pMessageResponse,
  IA2pMessage,
  IZnsMessage,
} from './types/zalo-types';
import { AxiosResponse } from 'axios';

@Injectable()
export class ZaloHookService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  private sendA2PMessage(a2pMessage: IA2pMessage): Promise<I2pMessageResponse> {
    const data = JSON.stringify(a2pMessage);

    const config = {
      method: 'post',
      url: 'https://gateway.gapone.vn/a2p-request',
      data,
    };
    return new Promise((resolve, reject) => {
      AxiosIns(config)
        .then((res: AxiosResponse<I2pMessageResponse>) => {
          this.logger.log(
            `Axios sendA2PMessage return ():${JSON.stringify(res.data)}`,
            ZaloHookService.name,
          );
          resolve(res.data);
        })
        .catch((e) => {
          console.log(
            '🚀 ~ file: zalo-hook.service.ts:31 ~ ZaloHookService ~ sendA2PMessage ~ e:',
            e,
          );
          this.logger.error(
            `Send sendA2PMessage Error ():${e.message}`,
            ZaloHookService.name,
          );
          reject(e);
        });
    });
  }
  async sendZaloZns(message: IZnsMessage) {
    const a2pMessage: IA2pMessage = {
      request_id: getNewUUid(),
      message,
    };
    const result = await this.sendA2PMessage(a2pMessage);
    return result;
  }

  sendZnsShipped(dto: ZaloShippedDTO) {
    const message: IZnsMessage = {
      channel: 'zalo',
      from: '1204891152354434149',
      to: dto.toZaloPhoneNumber,
      template_id: '281455',
      template_data: {
        ma_buupham: dto.shipment_id,
        ma_dh: dto.last_mile_tracking_id,
        don_vi_VC: dto.shipment_provider_lastmile,
      },
    };
    this.logger.log(
      `Send sendZnsShipped ():${JSON.stringify(message)}`,
      ZaloHookService.name,
    );
    return this.sendZaloZns(message);
  }

  sendZnsThanksCustomer(dto: IZaloThanksCustomerDTO) {
    const message: IZnsMessage = {
      channel: 'zalo',
      from: '1204891152354434149',
      to: dto.toZaloPhoneNumber,
      template_id: '274508',
      template_data: {
        ten_KH: dto.customerName,
        ma_DH: dto.orderId,
        ngay: dto.dateTimeStr,
      },
    };
    this.logger.log(
      `Send sendZnsThanksCustomer ():${JSON.stringify(message)}`,
      ZaloHookService.name,
    );
    return this.sendZaloZns(message);
  }

  sendZnsOrderShipping_284910(dto: IZaloZnsShipment) {
    const message: IZnsMessage = {
      channel: 'zalo',
      from: '1204891152354434149',
      to: dto.toZaloPhoneNumber,
      template_id: '284910',
      template_data: {
        ten_KH: dto.customerName,
        shipment_id: dto.shipmentId,
        origin_warehouse_country: dto.originWarehouseCountry,
      },
    };
    this.logger.log(
      `Send sendZnsOrderShipping_284910 ():${JSON.stringify(message)}`,
      ZaloHookService.name,
    );
    return this.sendZaloZns(message);
  }
  sendZnsPackageShipped_285273(dto: IZaloZnsShipment) {
    const message: IZnsMessage = {
      channel: 'zalo',
      from: '1204891152354434149',
      to: dto.toZaloPhoneNumber,
      template_id: '285273',
      template_data: {
        ten_KH: dto.customerName,
        shipment_id: dto.shipmentId,
        origin_warehouse_country: dto.originWarehouseCountry,
      },
    };
    this.logger.log(
      `Send sendZnsPackageShipped_285273 ():${JSON.stringify(message)}`,
      ZaloHookService.name,
    );
    return this.sendZaloZns(message);
  }
}
