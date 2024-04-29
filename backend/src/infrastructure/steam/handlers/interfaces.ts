export interface SteamHandlerInterface {}

export interface SteamOwnedGames {
  game_count: number;
  games: SteamGameBasicInfo[];
}

export interface SteamGameBasicInfo {
  appid: string;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  rtime_last_played: number;
  playtime_disconnected: number;
}

export interface SteamGameUserAchievements {
  steamID: string;
  gameName: string;
  success: boolean;
}

export interface SteamGameUserAchievement {
  apiname: string;
  achieved: 1 | 0;
  unlocktime: string;
}
