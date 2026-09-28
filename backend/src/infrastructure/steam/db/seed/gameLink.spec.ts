import { igdbSteamLink } from './gameLink';

const mockWhere = jest.fn();
const mockWrite = jest.fn();
const mockValues = jest.fn();
jest.mock('src/db/db', () => ({
  db: {
    select: () => ({ from: () => ({ leftJoin: () => ({ where: mockWhere }) }) }),
    insert: () => ({ values: mockValues }),
  },
}));

const site = (id: number) => ({
  websites: { url: `https://store.steampowered.com/app/${id}/title` },
  games: { igdbId: id + 10000 },
});

describe('Steam metadata link seeding', () => {
  beforeEach(() => { jest.resetAllMocks(); });

  it('waits for every batch, including the final partial batch', async () => {
    mockWhere.mockResolvedValue(Array.from({ length: 2214 }, (_, i) => site(i + 1)));
    const completed: number[] = [];
    mockValues.mockImplementation((rows?: any) => ({ onConflictDoNothing: () => new Promise<void>((resolve) => {
      setImmediate(() => { completed.push(rows.length); resolve(); });
    }) }));
    await igdbSteamLink();
    expect(completed).toEqual([1000, 1000, 214]);
  });

  it('deduplicates app IDs and ignores malformed URLs and missing games', async () => {
    mockWhere.mockResolvedValue([site(1), site(1), { websites: { url: 'https://example.com' }, games: { igdbId: 2 } }, { ...site(2), games: null }]);
    mockValues.mockImplementation(() => ({ onConflictDoNothing: mockWrite }));
    mockWrite.mockResolvedValue(undefined);
    await igdbSteamLink();
    expect(mockValues).toHaveBeenCalledWith([{ steamId: 1, igdbId: 10001 }]);
  });

  it('propagates write errors so a partial seed cannot report success', async () => {
    mockWhere.mockResolvedValue([site(1)]);
    mockValues.mockImplementation(() => ({ onConflictDoNothing: mockWrite }));
    mockWrite.mockRejectedValue(new Error('write failed'));
    await expect(igdbSteamLink()).rejects.toThrow('write failed');
  });
});
