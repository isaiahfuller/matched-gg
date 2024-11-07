import { setAllConflictUpdateColumns } from '@util/setAllConflictUpdateColumns';
import { QueryResult } from 'pg';
import { db } from 'src/db/db';

export class IgdbDbController {
  private readonly db = db;

  public getConnection() {
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

  public async storeManyToMany<T>(
    data: T | T[],
    table: any,
  ): Promise<QueryResult<T[]>> {
    return this.db.insert(table).values([data].flat()).onConflictDoNothing();
  }

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
