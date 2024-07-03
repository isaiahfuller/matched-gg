import { Languages } from '../schema/languages';

export const mapLanguage = (language) => {
  const mapped = {
    checksum: language.checksum,
    igdbCreatedAt: language.created_at
      ? new Date(language.created_at * 1000)
      : null,
    igdbId: language.id,
    igdbUpdatedAt: language.updated_at
      ? new Date(language.updated_at * 1000)
      : null,
    locale: language.locale,
    name: language.name || 'NO_NAME',
    nativeName: language.native_name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies Languages;
  return mapped;
};
