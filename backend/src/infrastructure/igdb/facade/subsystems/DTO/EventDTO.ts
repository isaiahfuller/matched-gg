import { BaseDTO } from './BaseDTO';

export interface EventDTO extends BaseDTO {
  description: string;
  endTime: number;
  games: number[];
  id: number;
  liveStreamUrl: string;
  name: string;
  slug: string;
  startTime: number;
  timeZone: string;
  videos: number;
}
