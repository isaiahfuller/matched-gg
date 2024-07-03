import { LanguageSupportTypes } from '../schema/languageSupportTypes';

export const mapLanguageSupportType = (lst) => {
  const mapped = {
    checksum: lst.checksum,
    igdbCreatedAt: lst.created_at ? new Date(lst.created_at * 1000) : null,
    igdbId: lst.id,
    igdbUpdatedAt: lst.updated_at ? new Date(lst.updated_at * 1000) : null,
    name: lst.name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies LanguageSupportTypes;
  return mapped;
};
