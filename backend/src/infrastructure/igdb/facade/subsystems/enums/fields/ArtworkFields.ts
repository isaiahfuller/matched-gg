/**
 * Enum representing the available fields for an artwork in the IGDB API.
 */
export enum ArtworkFields {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  game = 'game',
  height = 'height',
  image_id = 'image_id',
  url = 'url',
  width = 'width',
}

export enum ExpandedArtworkFields {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  game = 'game.*',
  height = 'height',
  image_id = 'image_id',
  url = 'url',
  width = 'width',
}