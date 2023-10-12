import { ChannelType, IZnsMessage } from '../types/zalo-types';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlankString } from '@nestjsi/class-validator';

export class ZaloShippedDTO {
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'toZaloPhoneNumber',
  })
  toZaloPhoneNumber: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'last_mile_tracking_id',
  })
  last_mile_tracking_id: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'shipment_provider_lastmile',
  })
  shipment_provider_lastmile: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'shipment_id',
  })
  shipment_id: string;
}

export interface IZaloThanksCustomerDTO {
  toZaloPhoneNumber: string;

  customerName: string;

  orderId: string;

  dateTimeStr: string;
}
export class ZaloThanksCustomerDTO implements IZaloThanksCustomerDTO {
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'toZaloPhoneNumber',
  })
  toZaloPhoneNumber: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'customerName',
  })
  customerName: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'orderId',
  })
  orderId: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'dateTimeStr',
  })
  dateTimeStr: string;
}

export class ZaloZnsDTO implements IZnsMessage {
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'channel',
  })
  channel: ChannelType;
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'from',
  })
  from: string;
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'to',
  })
  to: string;
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'template_id',
  })
  template_id: string;
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'template_data',
  })
  template_data: any;
}

export interface IZaloZnsShipment {
  toZaloPhoneNumber: string;
  customerName: string;
  shipmentId: string;
  originWarehouseCountry: string;
}

export class ZaloZnsShipment implements IZaloZnsShipment {
  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'toZaloPhoneNumber',
  })
  toZaloPhoneNumber: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'customerName',
  })
  customerName: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'shipmentId',
  })
  shipmentId: string;

  @IsNotBlankString()
  @ApiProperty({
    required: true,
    description: 'originWarehouseCountry',
  })
  originWarehouseCountry: string;
}
