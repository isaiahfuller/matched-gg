import {
  PgUpdateSetSource,
  PgTable,
  getTableConfig,
} from 'drizzle-orm/pg-core';
import { getTableColumns, sql } from 'drizzle-orm';

export function setAllConflictUpdateColumns<TTable extends PgTable>(
  table: TTable,
  excludedColumns?: (keyof TTable['_']['columns'])[],
): PgUpdateSetSource<TTable> {
  const columns = getTableColumns(table);
  const { name: tableName } = getTableConfig(table);
  const conflictUpdateSet = Object.entries(columns).reduce(
    (acc, [columnName, columnInfo]) => {
      if (excludedColumns && excludedColumns.includes(columnName)) {
        return acc;
      }
      if (!columnInfo.default) {
        acc[columnName] = sql.raw(
          `COALESCE(excluded.${columnInfo.name}, ${tableName}.${columnInfo.name})`,
        );
      }
      return acc;
    },
    {},
  ) as PgUpdateSetSource<TTable>;
  return conflictUpdateSet;
}
