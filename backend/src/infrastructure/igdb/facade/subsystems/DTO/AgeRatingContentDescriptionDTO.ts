import { AgeRatingContentDescriptionCategory } from '../enums/AgeRatingContentDescriptionCategory';
import { StaticBaseDTO } from './BaseDTO';

export interface AgeRatingContentDescriptionDTO extends StaticBaseDTO {
  trusted: boolean;
  url: string;
  category?: AgeRatingContentDescriptionCategory;
}
