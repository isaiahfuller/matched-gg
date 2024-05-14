import { Website } from '../enums/Website';

export interface CompanyWebsiteDTO {
  category: Website;
  checksum: string;
  id: number;
  trusted: boolean;
  url: string;
}
