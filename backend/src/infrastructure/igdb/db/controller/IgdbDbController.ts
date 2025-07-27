import { setAllConflictUpdateColumns } from '@util/setAllConflictUpdateColumns';
import { eq } from 'drizzle-orm';
import { QueryResult } from 'pg';
import { db } from 'src/db/db';

export class IgdbDbController {
  private readonly db = db;

  public async delete<T extends { igdbId: number }>(
    data: T,
    table: any,
  ): Promise<QueryResult<T[]>> {
    return this.db.delete(table).where(eq(table.igdbId, data.igdbId));
  }

  /**
   *
   * @returns Drizzle instance
   * @deprecated
   * This is imported from another file, and doesn't need to be retrieved from here
   */
  public getConnection() {
    return this.db;
  }

  /**
   *
   * @param data - Data to be stored
   * @param table - Table to store data to
   * @typeParam T - Type of the table
   * @returns
   */
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

  /**
   *
   * @see {@link store}
   */
  public async storeManyToMany<T>(
    data: T | T[],
    table: any,
  ): Promise<QueryResult<T[]>> {
    return this.db
      .insert(table)
      .values([data].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(table, ['gameId']),
        target: [table.gameId, table.resourceId],
      });
  }

  /**
   *
   * @see {@link store}
   */
  public async storeOwnedSteam(data, table) {
    console.log(table, data);
    return this.db
      .insert(table)
      .values([data].flat())
      .onConflictDoUpdate({
        set: setAllConflictUpdateColumns(table, ['userId', 'steamId']),
        target: [table.userId, table.steamId],
      });
  }
}
