export interface SteamHandlerInterface {}

export interface SteamOwnedGames {
  game_count: number;
  games: SteamGameBasicInfo[];
}

export interface SteamGameBasicInfo {
  appid: string;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export interface SteamGameUserAchievements {
  gameName: string;
  steamID: string;
  success: boolean;
}

export interface SteamGameUserAchievement {
  achieved: 0 | 1;
  apiname: string;
  unlocktime: string;
}
