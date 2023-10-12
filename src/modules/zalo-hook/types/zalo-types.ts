export type ChannelType =
  | 'sms'
  | 'zalo'
  | 'zalooa'
  | 'viber'
  | 'email'
  | 'whatsapp';

export interface IZnsMessage {
  channel: ChannelType;
  from: string;
  to: string;
  template_id: string;
  template_data: any;
}

export interface IA2pMessage {
  request_id: string;
  message: IZnsMessage;
}
export interface I2pMessageResponse {
  request_id: string;
  message_id: string;
}
