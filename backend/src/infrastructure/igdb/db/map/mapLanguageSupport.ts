import { LanguageSupports } from '../schema/languageSupport';

export const mapLanguageSupport = (support) => {
  const mapped = {
    checksum: support.checksum,
    game: support.game,
    igdbCreatedAt: support.created_at
      ? new Date(support.created_at * 1000)
      : null,
    igdbId: support.id,
    igdbUpdatedAt: support.updated_at
      ? new Date(support.updated_at * 1000)
      : null,
    language: support.language,
    languageSupportType: support.language_support_type,
    updatedAt: new Date(),
  } satisfies LanguageSupports;
  return mapped;
};
