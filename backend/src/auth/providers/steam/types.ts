import { Request } from 'express';

export interface Options {
  apiKey: string;
  passReqToCallback?: boolean;
  realm: string;
  returnUrl: string;
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
  profile: {
    avatar: string;
    avatarfull: string;
    avatarhash: string;
    avatarmedium: string;
    commentpermission: number;
    communityvisibilitystate: number;
    lastlogoff: number;
    loccountrycode: string;
    locstatecode: string;
    personaname: string;
    personastate: number;
    personastateflags: number;
    primaryclanid: string;
    profilestate: number;
    profileurl: string;
    realname: string;
    steamid: string;
    timecreated: number;
  };
}

export interface SteamAuthResponse extends Request {
  user: SteamProfile;
}
