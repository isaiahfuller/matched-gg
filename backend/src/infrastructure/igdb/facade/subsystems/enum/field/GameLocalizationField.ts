export enum GameLocalizationField {
  checksum = 'checksum',
  cover = 'cover',
  created_at = 'created_at',
  game = 'game',
  name = 'name',
  region = 'region',
  updated_at = 'updated_at',
}
export enum ExpandedGameLocalizationField {
  checksum = 'checksum',
  cover = 'cover.*',
  created_at = 'created_at',
  game = 'game.*',
  name = 'name',
  region = 'region.*',
  updated_at = 'updated_at',
}
