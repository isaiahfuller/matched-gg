import { BaseDTO } from './BaseDTO';

export type NRCollectionDTO = Pick<
  CollectionDTO,
  'checksum' | 'created_at' | 'name' | 'slug' | 'updated_at' | 'url'
>;

export interface CollectionDTO extends BaseDTO {
  games: number[];
  name: string;
  slug: string;
  url: string;
}
