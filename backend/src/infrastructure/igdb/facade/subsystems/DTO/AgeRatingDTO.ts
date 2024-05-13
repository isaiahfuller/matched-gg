import { AgeRatingCategoryEnum } from '../enums/AgeRatingCategoryEnum';
import { AgeRatingEnum } from '../enums/AgeRatingEnum';
import { StaticBaseDTO } from './BaseDTO';

export type NGAgeRatingDTO = Pick<
  AgeRatingDTO,
  'checksum' | 'content_descriptions' | 'rating_cover_url' | 'synopsis'
>;

export interface AgeRatingDTO extends StaticBaseDTO {
  category: AgeRatingCategoryEnum;
  content_descriptions: number[];
  rating: AgeRatingEnum;
  rating_cover_url: string;
  synopsis: string;
}
