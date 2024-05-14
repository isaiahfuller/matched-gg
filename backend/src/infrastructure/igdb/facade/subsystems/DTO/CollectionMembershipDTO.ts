import { CollectionMembershipTypeEnum } from '../enums/CollectionMembershipTypeEnum';
import { BaseDTO } from './BaseDTO';

export interface CollectionMembershipDTO extends BaseDTO {
  collection: number;
  game: number;
  type: CollectionMembershipTypeEnum;
}
