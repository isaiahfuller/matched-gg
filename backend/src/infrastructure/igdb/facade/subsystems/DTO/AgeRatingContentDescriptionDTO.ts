import { AgeRatingContentDescriptionCategory } from '../enums/AgeRatingContentDescriptionCategory';
import { StaticBaseDTO } from './BaseDTO';

export type NRAgeRatingContentDescriptionDTO = Pick<
  AgeRatingContentDescriptionDTO,
  'category' | 'checksum' | 'trusted' | 'url'
>;

export interface AgeRatingContentDescriptionDTO extends StaticBaseDTO {
  category?: AgeRatingContentDescriptionCategory;
  trusted: boolean;
  url: string;
}
