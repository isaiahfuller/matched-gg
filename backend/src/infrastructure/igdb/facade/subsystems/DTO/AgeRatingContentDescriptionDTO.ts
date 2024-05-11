import { AgeRatingContentDescriptionCategory } from '../enums/AgeRatingContentDescriptionCategory';

export type NRAgeRatingContentDescriptionDTO = Pick<
  AgeRatingContentDescriptionDTO,
  'category' | 'checksum' | 'trusted' | 'url'
>;

export interface AgeRatingContentDescriptionDTO {
  category?: AgeRatingContentDescriptionCategory;
  checksum?: string;
  trusted: boolean;
  url: string;
}
