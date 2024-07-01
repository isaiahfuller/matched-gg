export enum GameVersionField {
  checksum = 'checksum',
  created_at = 'created_at',
  features = 'features',
  game = 'game',
  games = 'games',
  updated_at = 'updated_at',
  url = 'url',
}

export enum ExpandedGameVersionField {
  checksum = 'checksum',
  created_at = 'created_at',
  features = 'features.*',
  game = 'game.*',
  games = 'games.*',
  updated_at = 'updated_at',
  url = 'url',
}
