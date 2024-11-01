import { chunk } from '@util/chunk';
import { isNotNull } from 'drizzle-orm';

import { IgdbDbController } from '../controller/IgdbDbController';
import * as gamesSchema from '../schema/games';
const igdbDbController = new IgdbDbController();
const db = igdbDbController.getConnection();

export const processRelations = async () => {
  const gameKeywords: gamesSchema.GameKeywords[] = [];
  const games = await db.query.gamesTable.findMany({
    columns: {
      igdbId: true,
      keywords: true,
    },
    where: isNotNull(gamesSchema.gamesTable.keywords),
  });
  for (const game of games) {
    for (const keyword of game.keywords!) {
      gameKeywords.push({ gameId: game.igdbId, keywordId: keyword });
    }
  }
  const gkChunks = chunk(gameKeywords, 1000);
  gkChunks.forEach(async (chunk) => {
    await igdbDbController.storeManyToMany<gamesSchema.GameKeywords>(
      chunk,
      gamesSchema.gameKeywords,
    );
  });
  // const tg = await db.query.gamesTable.findMany({
  //   columns: {
  //     igdbId: true,
  //     name: true,
  //   },
  //   limit: 10,
  //   where: isNotNull(gamesSchema.gamesTable.keywords),
  //   with: {
  //     keywords: {
  //       columns: {},
  //       with: {
  //         k: true,
  //       },
  //     },
  //   },
  // });
  // console.log(tg, tg[0], tg[0].keywords);
};
