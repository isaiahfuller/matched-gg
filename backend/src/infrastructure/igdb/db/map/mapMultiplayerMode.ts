import { MultiplayerModes } from '../schema/multiplayerModes';

export const mapMultiplayerMode = (mode) => {
  const mapped = {
    campaignCoop: mode.campaigncoop,
    checksum: mode.checksum,
    dropIn: mode.dropin,
    game: mode.game,
    igdbId: mode.id,
    lanCoop: mode.lancoop,
    offlineCoop: mode.offlinecoop,
    offlineCoopMax: mode.offlinecoopmax,
    offlineMax: mode.offlinemax,
    onlineCoop: mode.onlinecoop,
    onlineCoopMax: mode.onlinecoopmax,
    onlineMax: mode.onlinemax,
    platform: mode.platform,
    splitscreen: mode.splitscreen,
    splitscreenOnline: mode.splitscreenonline,
    updatedAt: new Date(),
  } satisfies MultiplayerModes;
  return mapped;
};
