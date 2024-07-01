/**
 * Enum representing the available fields for an age rating in the IGDB API.
 */
export enum AgeRatingFields {
  category = 'category',
  checksum = 'checksum',
  content_descriptions = 'content_descriptions',
  rating = 'rating',
  rating_cover_url = 'rating_cover_url',
  synopsis = 'synopsis',
}

/**
 * Enum representing the expanded fields for an age rating.
 */
export enum ExpandedAgeRatingFields {
  category = 'category.*',
  checksum = 'checksum',
  content_descriptions = 'content_descriptions.*',
  rating = 'rating',
  rating_cover_url = 'rating_cover_url',
  synopsis = 'synopsis',
}
