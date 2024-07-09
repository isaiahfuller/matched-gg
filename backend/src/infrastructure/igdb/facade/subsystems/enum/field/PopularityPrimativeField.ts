export enum PopularityPrimitiveField {
  calculated_at = 'calculated_at',
  checksum = 'checksum',
  created_at = 'created_at',
  game_id = 'game_id',
  popularity_source = 'popularity_source',
  popularity_type = 'popularity_type',
  updated_at = 'updated_at',
  value = 'value',
}
export enum ExpandedPopularityPrimitiveField {
  calculated_at = 'calculated_at',
  checksum = 'checksum',
  created_at = 'created_at',
  game_id = 'game_id.*',
  popularity_source = 'popularity_source',
  popularity_type = 'popularity_type.*',
  updated_at = 'updated_at',
  value = 'value',
}
