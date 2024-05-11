import { Companies } from '../schema/companies';

export const mapCompany = (company) => {
  const mappedCompany = {
    igdbId: company.id,
    changeDate: company.change_date,
    changeDateCategory: company.change_date_category,
    changedCompanyId: company.changed_company_id,
    checksum: company.checksum,
    country: company.country,
    igdbCreatedAt: company.created_at
      ? new Date(company.created_at * 1000)
      : null,
    description: company.description,
    developed: company.developed,
    logo: company.logo,
    name: company.name,
    parent: company.parent,
    published: company.published,
    slug: company.slug,
    startDate: company.start_date,
    startDateCategory: company.start_date_category,
    igdbUpdatedAt: company.updated_at
      ? new Date(company.updated_at * 1000)
      : null,
    updatedAt: new Date(),
    url: company.url,
    websites: company.websites,
  } satisfies Companies;
  return mappedCompany;
};
