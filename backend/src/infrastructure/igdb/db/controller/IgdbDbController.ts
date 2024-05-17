import { db } from 'src/db/db';
import * as gamesSchema from '../schema/games';
import * as websitesSchema from '../schema/websites';
import * as artworksSchema from '../schema/artworks';
import { QueryResult } from 'pg';
import { setAllConflictUpdateColumns } from '../util/setAllConflictUpdateColumns';

export class IgdbDbController {
  private readonly db = db;

  public async getConnection() {
    return this.db;
  }

  public async storeGames(
    games: gamesSchema.Games[] | gamesSchema.Games,
  ): Promise<QueryResult<gamesSchema.Games[]>> {
    return await this.db
      .insert(gamesSchema.gamesTable)
      .values([games].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(gamesSchema.gamesTable, [
          'createdAt',
          'igdbId',
          'id',
        ]),
        target: gamesSchema.gamesTable.igdbId,
      });
  }

  public async storeWebsites(
    websites: websitesSchema.Websites[] | websitesSchema.Websites,
  ): Promise<QueryResult<websitesSchema.Websites[]>> {
    return await this.db
      .insert(websitesSchema.websitesTable)
      .values([websites].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(websitesSchema.websitesTable, [
          'igdbId',
        ]),
        target: websitesSchema.websitesTable.igdbId,
      });
  }

  public async storeArtworks(
    artworks: artworksSchema.Artworks[] | artworksSchema.Artworks,
  ): Promise<QueryResult<artworksSchema.Artworks[]>> {
    return await this.db
      .insert(artworksSchema.artworksTable)
      .values([artworks].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(artworksSchema.artworksTable, [
          'imageId',
        ]),
        target: artworksSchema.artworksTable.imageId,
      });
  }
}
