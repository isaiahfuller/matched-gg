import { InvolvedCompanies } from '../schema/involvedCompanies';

export const mapInvolvedCompany = (company) => {
  const mapped = {
    checksum: company.checksum,
    company: company.company,
    developer: company.developer,
    game: company.game,
    igdbCreatedAt: company.created_at
      ? new Date(company.created_at * 1000)
      : null,
    igdbId: company.id,
    igdbUpdatedAt: company.updated_at
      ? new Date(company.updated_at * 1000)
      : null,
    porting: company.porting,
    publisher: company.publishing,
    supporting: company.supporting,
    updatedAt: new Date(),
  } satisfies InvolvedCompanies;
  return mapped;
};
