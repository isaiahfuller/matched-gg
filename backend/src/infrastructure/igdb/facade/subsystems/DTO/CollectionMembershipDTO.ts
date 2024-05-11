import { CollectionMembershipTypeEnum } from '../enums/CollectionMembershipTypeEnum';

export type NRCollectionMembershipDTO = Pick<
  CollectionMembershipDTO,
  'checksum' | 'created_at' | 'type' | 'updated_at'
>;

export interface CollectionMembershipDTO {
  checksum: string;
  collection: number;
  created_at: number;
  game: number;
  type: CollectionMembershipTypeEnum;
  updated_at: number;
}
