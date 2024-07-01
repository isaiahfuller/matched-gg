export enum GameEngineField {
  checksum = 'checksum',
  companies = 'companies',
  created_at = 'created_at',
  description = 'description',
  id = 'id',
  logo = 'logo',
  name = 'name',
  platforms = 'platforms',
  slug = 'slug',
  updated_at = 'updated_at',
  url = 'url',
}

export enum ExpandedGameEngineField {
  checksum = 'checksum',
  companies = 'companies.*',
  created_at = 'created_at',
  description = 'description',
  id = 'id',
  logo = 'logo.*',
  name = 'name',
  platforms = 'platforms.*',
  slug = 'slug',
  updated_at = 'updated_at',
  url = 'url',
}
