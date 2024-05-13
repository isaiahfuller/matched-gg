import { CollectionMembershipTypeEnum } from '../enums/CollectionMembershipTypeEnum';
import { BaseDTO } from './BaseDTO';

export type NRCollectionMembershipDTO = Pick<
  CollectionMembershipDTO,
  'checksum' | 'created_at' | 'type' | 'updated_at'
>;

export interface CollectionMembershipDTO extends BaseDTO {
  collection: number;
  game: number;
  type: CollectionMembershipTypeEnum;
}
