import { buildUserStats } from './userStats';

describe('buildUserStats', () => {
  it('counts all owned games but ranks only played games, deduplicating categories', () => {
    const genre = { igdbId: 1, name: 'Adventure' };
    const base = { name: 'Game', matched: true, genres: [genre, genre], themes: [], tags: [] };
    const stats = buildUserStats([
      { ...base, steamId: 1, playtime: 120 },
      { ...base, steamId: 2, playtime: 60 },
      { ...base, steamId: 3, playtime: 0 },
      { ...base, steamId: 4, playtime: 30, matched: false, genres: [] },
    ]);
    expect(stats).toMatchObject({ totalGames: 4, playedGames: 3, unplayedGames: 1, totalMinutes: 210, matchedGames: 3 });
    expect(stats.genres).toEqual([{ id: 1, name: 'Adventure', minutes: 180, games: 2 }]);
    expect(stats.mostPlayed.map((game) => game.steamId)).toEqual([1, 2, 4]);
  });

  it('handles an empty library', () => {
    expect(buildUserStats([])).toMatchObject({ totalGames: 0, totalMinutes: 0, genres: [], themes: [], tags: [], mostPlayed: [] });
  });
});
