import { db } from 'src/db/db';
import * as gamesSchema from '../schema/games';
import * as websitesSchema from '../schema/websites';
import * as artworksSchema from '../schema/artworks';
import { QueryResult } from 'pg';

export class IgdbDbController {
  private readonly db = db;

  public async getConnection() {
    return this.db;
  }

  public async storeGames(
    games: gamesSchema.Games[] | gamesSchema.Games,
  ): Promise<QueryResult<gamesSchema.Games[]>> {
    return await this.db.insert(gamesSchema.gamesTable).values([games].flat());
  }

  public async storeWebsites(
    websites: websitesSchema.Websites[] | websitesSchema.Websites,
  ): Promise<QueryResult<websitesSchema.Websites[]>> {
    return await this.db
      .insert(websitesSchema.websitesTable)
      .values([websites].flat());
  }

  public async storeArtworks(
    artworks: artworksSchema.Artworks[] | artworksSchema.Artworks,
  ): Promise<QueryResult<artworksSchema.Artworks[]>> {
    return await this.db
      .insert(artworksSchema.artworksTable)
      .values([artworks].flat());
  }
}
