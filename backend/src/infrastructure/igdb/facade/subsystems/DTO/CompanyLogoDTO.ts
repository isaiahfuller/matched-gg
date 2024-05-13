import { ArtBaseDTO } from './ArtBaseDTO';

export type NGCompanyLogoDTO = Pick<
  CompanyLogoDTO,
  | 'alpha_channel'
  | 'animated'
  | 'checksum'
  | 'height'
  | 'image_id'
  | 'url'
  | 'width'
>;

export interface CompanyLogoDTO extends ArtBaseDTO {}
