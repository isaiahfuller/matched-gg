export enum FranchiseField {
  checksum = 'checksum',
  created_at = 'created_at',
  games = 'games',
  id = 'id',
  name = 'name',
  slug = 'slug',
  updated_at = 'updated_at',
  url = 'url',
}
export enum ExpandedFranchiseField {
  checksum = 'checksum',
  created_at = 'created_at',
  games = 'games.*',
  id = 'id',
  name = 'name',
  slug = 'slug',
  updated_at = 'updated_at',
  url = 'url',
}
