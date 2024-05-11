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

export interface CompanyLogoDTO {
  alpha_channel: boolean;
  animated: boolean;
  checksum: string;
  height: number;
  id: number;
  image_id: string;
  url: string;
  width: number;
}
