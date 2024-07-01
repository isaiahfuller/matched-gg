import { AgeRatingCategoryEnum } from '../enum/descriptor/AgeRatingCategoryEnum';
import { AgeRatingEnum } from '../enum/descriptor/AgeRatingEnum';
import { StaticBaseDTO } from './BaseDTO';

export interface AgeRatingDTO extends StaticBaseDTO {
  category?: AgeRatingCategoryEnum;
  content_descriptions?: number[];
  rating?: AgeRatingEnum;
  rating_cover_url?: string;
  synopsis?: string;
}
