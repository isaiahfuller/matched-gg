import { chunk } from '../../../../util/chunk';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from 'src/db/db';
import { gamesTable } from 'src/infrastructure/igdb/db/schema/games';
import { websitesTable } from 'src/infrastructure/igdb/db/schema/websites';
import { igdbSteamConnect } from '../schema/igdbSteamConnect';

export const igdbSteamLink = async () => {
  const games = new Map<number, { igdbId: number; steamId: number }>();
  const sites = await db
    .select()
    .from(websitesTable)
    .leftJoin(gamesTable, eq(gamesTable.igdbId, websitesTable.game))
    .where(
      and(
        eq(websitesTable.type, 13),
        inArray(gamesTable.gameType, [9, 10, 11, 8, 5, 4, 0, 12, 3]),
      ),
    );
  const vals = Object.values(sites);
  for (const e of vals) {
    const m = e.websites.url?.match(
      /https:\/\/store\.steampowered\.com\/app\/(\d*)\/?.*/,
    );
    if (m && m[1]) {
      if (!e.games || !e.games!.igdbId) continue;
      games.set(Number(m[1]), { igdbId: e.games!.igdbId, steamId: Number(m[1]) });
    }
  }
  const chunks = chunk([...games.values()], 1000);
  for (const chunk of chunks) {
    await db.insert(igdbSteamConnect).values(chunk).onConflictDoNothing();
  }
};
