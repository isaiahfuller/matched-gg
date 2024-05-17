import { BaseDTO } from './BaseDTO';

export interface EventDTO extends BaseDTO {
  description?: string;
  end_time?: number;
  games?: number[];
  id: number;
  live_stream_url?: string;
  name?: string;
  slug?: string;
  start_time?: number;
  time_zone?: string;
  videos?: number;
}
