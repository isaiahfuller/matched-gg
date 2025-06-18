import validateTimestamp from '@util/validateTimestamp';

import { UserOwnedGames } from '../schema/steamUserOwnedGames';

export const mapOwnedGame = (game, uid) => {
  const mapped = {
    lastPlayed: validateTimestamp(game.rtime_last_played),
    playtime: game.playtime_forever || 0,
    playtimeDeck: game.playtime_deck_forever,
    playtimeDisconnected: game.playtime_disconnected,
    playtimeLinux: game.playtime_linux_forever,
    playtimeMac: game.playtime_mac_forever,
    playtimeWindows: game.playtime_windows_forever,
    steamId: game.appid,
    updatedAt: new Date(),
    userId: uid,
  } satisfies UserOwnedGames;
  return mapped;
};
