/**
 * Enum representing the available fields for a website in the IGDB API.
 */
export enum WebsiteField {
  checksum = 'checksum',
  game = 'game',
  trusted = 'trusted',
  type = 'type',
  url = 'url',
}

/**
 * Enum representing the expanded fields for a website.
 */
export enum ExpandedWebsiteField {
  checksum = 'checksum',
  game = 'game.*',
  trusted = 'trusted',
  type = 'type',
  url = 'url',
}
