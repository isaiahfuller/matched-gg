import { QueryResult } from 'pg';
import { db } from 'src/db/db';

import * as artworksSchema from '../schema/artworks';
import * as companiesSchema from '../schema/companies';
import * as coversSchema from '../schema/covers';
import * as gamesSchema from '../schema/games';
import * as involvedCompaniesSchema from '../schema/involvedCompanies';
import * as websitesSchema from '../schema/websites';
import { setAllConflictUpdateColumns } from '../util/setAllConflictUpdateColumns';

export class IgdbDbController {
  private readonly db = db;

  public async getConnection() {
    return this.db;
  }

  public async storeArtworks(
    artworks: artworksSchema.Artworks | artworksSchema.Artworks[],
  ): Promise<QueryResult<artworksSchema.Artworks[]>> {
    return this.db
      .insert(artworksSchema.artworksTable)
      .values([artworks].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(artworksSchema.artworksTable, [
          'igdbId',
        ]),
        target: artworksSchema.artworksTable.igdbId,
      });
  }
  public async storeCompanies(
    companies: companiesSchema.Companies | companiesSchema.Companies[],
  ): Promise<QueryResult<companiesSchema.Companies[]>> {
    return this.db
      .insert(companiesSchema.companiesTable)
      .values([companies].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(companiesSchema.companiesTable, [
          'igdbId',
        ]),
        target: companiesSchema.companiesTable.igdbId,
      });
  }

  public async storeCovers(
    covers: coversSchema.Covers | coversSchema.Covers[],
  ): Promise<QueryResult<coversSchema.Covers[]>> {
    return this.db
      .insert(coversSchema.coversTable)
      .values([covers].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(coversSchema.coversTable, ['igdbId']),
        target: coversSchema.coversTable.igdbId,
      });
  }
  public async storeGames(
    games: gamesSchema.Games | gamesSchema.Games[],
  ): Promise<QueryResult<gamesSchema.Games[]>> {
    return this.db
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

  public async storeInvolvedCompanies(
    involvedCompanies:
      | involvedCompaniesSchema.InvolvedCompanies
      | involvedCompaniesSchema.InvolvedCompanies[],
  ): Promise<QueryResult<involvedCompaniesSchema.InvolvedCompanies[]>> {
    return this.db
      .insert(involvedCompaniesSchema.involvedCompaniesTable)
      .values([involvedCompanies].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(
          involvedCompaniesSchema.involvedCompaniesTable,
          ['igdbId'],
        ),
        target: involvedCompaniesSchema.involvedCompaniesTable.igdbId,
      });
  }

  public async storeWebsites(
    websites: websitesSchema.Websites | websitesSchema.Websites[],
  ): Promise<QueryResult<websitesSchema.Websites[]>> {
    return this.db
      .insert(websitesSchema.websitesTable)
      .values([websites].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(websitesSchema.websitesTable, [
          'igdbId',
        ]),
        target: websitesSchema.websitesTable.igdbId,
      });
  }
}
