import { Website } from '../enums/Website';

export type NRCompanyWebsiteDTO = Pick<
  CompanyWebsiteDTO,
  'checksum' | 'id' | 'trusted' | 'url'
>;

export interface CompanyWebsiteDTO {
  category: Website;
  checksum: string;
  id: number;
  trusted: boolean;
  url: string;
}
