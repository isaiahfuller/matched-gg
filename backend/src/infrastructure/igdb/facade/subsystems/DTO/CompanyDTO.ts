import { CompanyDateCategoryEnum } from '../enums/CompanyDateCategoryEnum';

export type NRCompanyDTO = Pick<
  CompanyDTO,
  | 'change_date'
  | 'change_date_category'
  | 'checksum'
  | 'country'
  | 'created_at'
  | 'description'
  | 'id'
  | 'name'
  | 'slug'
  | 'start_date'
  | 'start_date_category'
  | 'updated_at'
  | 'url'
>;

export interface CompanyDTO {
  change_date: number;
  change_date_category: CompanyDateCategoryEnum;
  changed_company_id: number;
  checksum: string;
  country: number;
  created_at: number;
  description: string;
  developed: number[];
  id: number;
  logo: number;
  name: string;
  parent: number;
  published: number[];
  slug: string;
  start_date: number;
  start_date_category: CompanyDateCategoryEnum;
  updated_at: number;
  url: string;
  websites: number[];
}
