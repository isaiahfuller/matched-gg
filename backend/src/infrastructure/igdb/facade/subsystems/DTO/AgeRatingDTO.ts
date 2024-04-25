import { AgeRatingCategoryEnum } from '../enums/AgeRatingCategoryEnum';
import { AgeRatingEnum } from '../enums/AgeRatingEnum';

export type NGAgeRatingDTO = Pick<
  AgeRatingDTO,
  'checksum' | 'content_descriptions' | 'rating_cover_url' | 'synopsis'
>;

export interface AgeRatingDTO {
  category: AgeRatingCategoryEnum;
  checksum: string;
  content_descriptions: number[];
  rating: AgeRatingEnum;
  rating_cover_url: string;
  synopsis: string;
}
