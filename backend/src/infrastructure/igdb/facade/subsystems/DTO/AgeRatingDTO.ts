import { AgeRatingCategoryEnum } from '../enums/descriptor/AgeRatingCategoryEnum';
import { AgeRatingEnum } from '../enums/descriptor/AgeRatingEnum';
import { StaticBaseDTO } from './BaseDTO';

export interface AgeRatingDTO extends StaticBaseDTO {
  category?: AgeRatingCategoryEnum;
  content_descriptions?: number[];
  rating?: AgeRatingEnum;
  rating_cover_url?: string;
  synopsis?: string;
}
