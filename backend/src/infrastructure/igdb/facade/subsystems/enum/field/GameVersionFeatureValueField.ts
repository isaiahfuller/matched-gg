export enum GameVersionFeatureValueField {
  checksum = 'checksum',
  game = 'game',
  game_feature = 'game_feature',
  id = 'id',
  included_feature = 'included_feature',
  note = 'note',
}
export enum ExpandedGameVersionFeatureValueField {
  checksum = 'checksum',
  game = 'game.*',
  game_feature = 'game_feature.*',
  id = 'id',
  included_feature = 'included_feature',
  note = 'note',
}
