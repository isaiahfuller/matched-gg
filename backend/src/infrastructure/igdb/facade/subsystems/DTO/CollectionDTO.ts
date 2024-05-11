export type NRCollectionDTO = Pick<
  CollectionDTO,
  'checksum' | 'created_at' | 'name' | 'slug' | 'updated_at' | 'url'
>;

export interface CollectionDTO {
  checksum: string;
  created_at: number;
  games: number[];
  name: string;
  slug: string;
  updated_at: number;
  url: string;
}
