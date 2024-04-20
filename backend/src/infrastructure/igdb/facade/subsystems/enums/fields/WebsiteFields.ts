/**
 * Enum representing the available fields for a website in the IGDB API.
 */
export enum WebsiteFields {
  category = 'category',
  checksum = 'checksum',
  game = 'game',
  trusted = 'trusted',
  url = 'url',
}

/**
 * Enum representing the expanded fields for a website.
 */
export enum ExpandedWebsiteFields {
  category = 'category',
  checksum = 'checksum',
  game = 'game.*',
  trusted = 'trusted',
  url = 'url',
}
