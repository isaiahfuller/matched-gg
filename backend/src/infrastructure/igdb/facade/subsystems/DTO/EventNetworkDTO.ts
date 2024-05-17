import { BaseDTO } from './BaseDTO';

export interface EventNetworkDTO extends BaseDTO {
  event?: number;
  network_type?: number[];
  url?: string;
}
