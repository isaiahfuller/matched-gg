export enum CollectionField {
  as_child_relations = 'as_child_relations',
  as_parent_relations = 'as_parent_relations',
  checksum = 'checksum',
  created_at = 'created_at',
  games = 'games',
  name = 'name',
  slug = 'slug',
  type = 'type',
  updated_at = 'updated_at',
  url = 'url',
}

export enum ExpandedCollectionField {
  as_child_relations = 'as_child_relations.*',
  as_parent_relations = 'as_parent_relations.*',
  checksum = 'checksum',
  created_at = 'created_at',
  games = 'games.*',
  name = 'name',
  slug = 'slug',
  type = 'type.*',
  updated_at = 'updated_at',
  url = 'url',
}
