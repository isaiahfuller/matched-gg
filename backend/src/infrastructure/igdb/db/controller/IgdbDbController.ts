import { QueryResult } from 'pg';
import { db } from 'src/db/db';

import * as artworksSchema from '../schema/artworks';
import * as companiesSchema from '../schema/companies';
import * as coversSchema from '../schema/covers';
import * as franchisesSchema from '../schema/franchise';
import * as gamesSchema from '../schema/games';
import * as genresSchema from '../schema/genres';
import * as involvedCompaniesSchema from '../schema/involvedCompanies';
import * as keywordsSchema from '../schema/keywords';
import * as multiplayerModesSchema from '../schema/multiplayerModes';
import * as platformFamiliesSchema from '../schema/platformFamilies';
import * as platformLogosSchema from '../schema/platformLogos';
import * as platformVersionCompaniesSchema from '../schema/platformVersionCompanies';
import * as platformVersionReleaseDatesSchema from '../schema/platformVersionReleaseDate';
import * as platformVersionsSchema from '../schema/platformVersions';
import * as platformWebsitesSchema from '../schema/platformWebsites';
import * as platformsSchema from '../schema/platforms';
import * as themesSchema from '../schema/themes';
import * as websitesSchema from '../schema/websites';
import { setAllConflictUpdateColumns } from '../util/setAllConflictUpdateColumns';

export class IgdbDbController {
  private readonly db = db;

  public async getConnection() {
    return this.db;
  }
  public async store<T extends { igdbId: number }>(
    data: T | T[],
    table: any,
  ): Promise<QueryResult<T[]>> {
    return this.db
      .insert(table)
      .values([data].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(table, ['igdbId']),
        target: table.igdbId,
      });
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
  public async storeFranchises(
    franchises: franchisesSchema.Franchises | franchisesSchema.Franchises[],
  ): Promise<QueryResult<franchisesSchema.Franchises[]>> {
    return this.db
      .insert(franchisesSchema.franchisesTable)
      .values([franchises].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(franchisesSchema.franchisesTable, [
          'igdbId',
        ]),
        target: franchisesSchema.franchisesTable.igdbId,
      });
  }

  public async storeGames(
    games: gamesSchema.Games | gamesSchema.Games[],
  ): Promise<QueryResult<gamesSchema.Games[]>> {
    return this.db
      .insert(gamesSchema.gamesTable)
      .values([games].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(gamesSchema.gamesTable, ['igdbId']),
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
