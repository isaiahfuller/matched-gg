import { InvolvedCompanies } from '../schema/involvedCompanies';
import validateTimestamp from '../util/validateTimestamp';

export const mapInvolvedCompany = (company) => {
  const mapped = {
    checksum: company.checksum,
    company: company.company,
    developer: company.developer,
    game: company.game,
    igdbCreatedAt: validateTimestamp(company.created_at),
    igdbId: company.id,
    igdbUpdatedAt: validateTimestamp(company.updated_at),
    porting: company.porting,
    publisher: company.publisher,
    supporting: company.supporting,
    updatedAt: new Date(),
  } satisfies InvolvedCompanies;
  return mapped;
};
