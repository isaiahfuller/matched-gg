export enum CollectionMembershipField {
  checksum = 'checksum',
  collection = 'collection',
  created_at = 'created_at',
  game = 'game',
  type = 'type',
  updated_at = 'updated_at',
}
export enum ExpandedCollectionMembershipField {
  checksum = 'checksum',
  collection = 'collection.*',
  created_at = 'created_at',
  game = 'game.*',
  type = 'type',
  updated_at = 'updated_at',
}
