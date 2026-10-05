interface Category { igdbId: number; name: string }
interface StatsGame {
  steamId: number;
  name: string;
  playtime: number;
  matched: boolean;
  genres: (Category | null)[];
  themes: (Category | null)[];
  tags: (Category | null)[];
}

export function buildUserStats(games: StatsGame[]) {
  const played = games.filter((game) => game.playtime > 0);
  const totalMinutes = played.reduce((sum, game) => sum + game.playtime, 0);
  const rank = (key: 'genres' | 'themes' | 'tags') => {
    const categories = new Map<number, { id: number; name: string; minutes: number; games: number }>();
    for (const game of played) {
      const seen = new Set<number>();
      for (const category of game[key]) {
        if (!category || seen.has(category.igdbId)) continue;
        seen.add(category.igdbId);
        const entry = categories.get(category.igdbId) ?? { id: category.igdbId, name: category.name, minutes: 0, games: 0 };
        entry.minutes += game.playtime;
        entry.games++;
        categories.set(entry.id, entry);
      }
    }
    return [...categories.values()].sort((a, b) => b.minutes - a.minutes || a.name.localeCompare(b.name)).slice(0, 10);
  };
  return {
    totalGames: games.length,
    playedGames: played.length,
    unplayedGames: games.length - played.length,
    totalMinutes,
    matchedGames: games.filter((game) => game.matched).length,
    mostPlayed: [...played].sort((a, b) => b.playtime - a.playtime || a.name.localeCompare(b.name)).slice(0, 10)
      .map(({ steamId, name, playtime }) => ({ steamId, name, minutes: playtime })),
    genres: rank('genres'),
    themes: rank('themes'),
    tags: rank('tags'),
  };
}
