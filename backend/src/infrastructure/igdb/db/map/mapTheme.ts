import { Themes } from '../schema/themes';

export const mapTheme = (theme) => {
  const mapped = {
    checksum: theme.checksum,
    igdbCreatedAt: theme.created_at ? new Date(theme.created_at * 1000) : null,
    igdbId: theme.id,
    igdbUpdatedAt: theme.updated_at ? new Date(theme.updated_at * 1000) : null,
    name: theme.name || 'NO_NAME',
    slug: theme.slug,
    url: theme.url,
  } satisfies Themes;
  return mapped;
};
