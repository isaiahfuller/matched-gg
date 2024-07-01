export enum EventLogoField {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  created_at = 'created_at',
  event = 'event',
  height = 'height',
  id = 'id',
  image_id = 'image_id',
  updated_at = 'updated_at',
  url = 'url',
  width = 'width',
}

export enum ExpandedEventLogoField {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  created_at = 'created_at',
  event = 'event.*',
  height = 'height',
  id = 'id',
  image_id = 'image_id',
  updated_at = 'updated_at',
  url = 'url',
  width = 'width',
}
