import { chunk } from '@util/chunk';
import { isNotNull } from 'drizzle-orm';

import { IgdbDbController } from '../controller/IgdbDbController';
import * as gamesSchema from '../schema/games';

interface RelationItem {
  gameId: number | string;
  resourceId: number | string;
}
export const processRelations = async () => {
  const igdbDbController = new IgdbDbController();
  const db = igdbDbController.getConnection();

  async function processRelation<T extends RelationItem>(resource, schema) {
    const resourceArray: T[] = [];
    const columns = {
      igdbId: true,
      [resource]: true,
    };
    const games: any = await db.query.gamesTable.findMany({
      columns,
      where: isNotNull(gamesSchema.gamesTable[resource]),
    });
    for (const game of games) {
      for (const res of game[resource]!) {
        const newItem = {
          gameId: game.igdbId,
          resourceId: res,
        } as T;

        resourceArray.push(newItem);
      }
    }
    const chunks = chunk(resourceArray, 1000);
    chunks.forEach(async (chunk) => {
      await igdbDbController.storeManyToMany<T>(chunk, schema);
    });
  }

  // await processRelation<gamesSchema.GameKeywords>(
  //   'keywords',
  //   gamesSchema.gameKeywords,
  // );
  // await processRelation<gamesSchema.GameFranchises>(
  //   'franchises',
  //   gamesSchema.gameFranchises,
  // );
  // await processRelation<gamesSchema.GamePlatforms>(
  //   'platforms',
  //   gamesSchema.gamePlatforms,
  // );

  const tg = await db.query.gamesTable.findMany({
    columns: {
      igdbId: true,
      name: true,
    },
    limit: 10,
    where: isNotNull(gamesSchema.gamesTable.platforms),
    with: {
      platforms: {
        columns: {},
        with: {
          platform: {
            with: {
              platformFamily: true,
              platformLogo: true,
            },
          },
        },
      },
    },
  });
  console.log(tg, tg[0], tg[0].platforms[0]);
  // const pl = await db.query.platformLogosTable.findMany({
  //   columns: {
  //     alphaChannel: true,
  //     animated: true,
  //     checksum: true,
  //     createdAt: true,
  //     height: true,
  //     igdbId: true,
  //     imageId: true,
  //     updatedAt: true,
  //     url: true,
  //     width: true,
  //   },
  //   limit: 10,
  // });
  // console.log(pl);
};
