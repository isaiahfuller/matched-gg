export enum NetworkTypeField {
  checksum = 'checksum',
  created_at = 'created_at',
  event_networks = 'event_networks',
  id = 'id',
  name = 'name',
  updated_at = 'updated_at',
}
export enum ExpandedNetworkTypeField {
  checksum = 'checksum',
  created_at = 'created_at',
  event_networks = 'event_networks.*',
  id = 'id',
  name = 'name',
  updated_at = 'updated_at',
}
