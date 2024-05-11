/**
 * Enum representing the available fields for an artwork in the IGDB API.
 */
export enum ArtworkField {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  game = 'game',
  height = 'height',
  id = 'id',
  image_id = 'image_id',
  url = 'url',
  width = 'width',
}

export enum ExpandedArtworkField {
  alpha_channel = 'alpha_channel',
  animated = 'animated',
  checksum = 'checksum',
  game = 'game.*',
  height = 'height',
  id = 'id',
  image_id = 'image_id',
  url = 'url',
  width = 'width',
}
