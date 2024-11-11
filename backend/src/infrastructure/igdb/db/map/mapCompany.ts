import validateTimestamp from '@util/validateTimestamp';

import { Companies, CompanyDateCategoryPGEnum } from '../schema/companies';

export const mapCompany = (company) => {
  const mappedCompany = {
    changeDate: validateTimestamp(company.change_date),
    changeDateCategory: company.change_date_category
      ? CompanyDateCategoryPGEnum.enumValues[company.change_date_category]
      : null,
    changedCompanyId: company.changed_company_id,
    checksum: company.checksum,
    country: company.country,
    description: company.description,
    developed: company.developed,
    igdbCreatedAt: validateTimestamp(company.created_at),
    igdbId: company.id,
    igdbUpdatedAt: validateTimestamp(company.updated_at),
    logo: company.logo,
    name: company.name,
    parent: company.parent,
    published: company.published,
    slug: company.slug,
    startDate: validateTimestamp(company.start_date),
    startDateCategory: company.start_date_category
      ? CompanyDateCategoryPGEnum.enumValues[company.start_date_category]
      : null,
    updatedAt: new Date(),
    url: company.url,
  } satisfies Companies;
  return mappedCompany;
};
