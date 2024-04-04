import { Request } from 'express';

export interface Options {
  returnURL: string;
  realm: string;
  apiKey: string;
  passReqToCallback?: boolean;
}

export type DoneFn = (err: unknown, user?: Express.User | false | null) => void;

export type ValidateFn<T extends Options> = T['passReqToCallback'] extends true
  ? (
      req: Request,
      identifier: SteamIdentifier,
      profile: SteamProfile,
      done: DoneFn,
    ) => void
  : (identifier: SteamIdentifier, profile: SteamProfile, done: DoneFn) => void;

type SteamIdentifier = string;

export interface SteamProfile {
  provider: 'steam';
  _json: {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    commentpermission: number;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    realname: string;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
    loccountrycode: string;
    locstatecode: string;
  };
  id: string;
  displayName: string;
  photos: Array<{ value: string }>;
}

export interface SteamAuthResponse {
  user: SteamProfile;
}
