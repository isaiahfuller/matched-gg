import validateTimestamp from '@util/validateTimestamp';

import { Companies } from '../schema/companies';

export const mapCompany = (company) => {
  const mappedCompany = {
    changeDate: validateTimestamp(company.change_date),
    changeDateFormat: company.change_date_format,
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
    startDateFormat: company.start_date_format,
    updatedAt: new Date(),
    url: company.url,
  } satisfies Companies;
  return mappedCompany;
};
