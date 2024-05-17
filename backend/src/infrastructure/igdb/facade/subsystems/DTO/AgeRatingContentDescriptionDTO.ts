import { AgeRatingContentDescriptionCategory } from '../enums/AgeRatingContentDescriptionCategory';
import { StaticBaseDTO } from './BaseDTO';

export interface AgeRatingContentDescriptionDTO extends StaticBaseDTO {
  category?: AgeRatingContentDescriptionCategory;
  trusted: boolean;
  url: string;
}
