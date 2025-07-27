import { Request } from 'express';
import { SteamOpenIdUserProfile } from 'passport-steam-openid';

export interface Options {
  apiKey: string;
  passReqToCallback?: boolean;
  profile: true;
  realm: string;
  returnUrl: string;
}

export type DoneFn = (err: unknown, user?: Express.User | false | null) => void;

export type ValidateFn<T extends Options> = T['passReqToCallback'] extends true
  ? (
      req: Request,
      identifier: SteamIdentifier,
      profile: SteamOpenIdUserProfile,
      done: DoneFn,
    ) => void
  : (
      identifier: SteamIdentifier,
      profile: SteamOpenIdUserProfile,
      done: DoneFn,
    ) => void;

type SteamIdentifier = string;

export interface SteamAuthResponse extends Request {
  user: SteamOpenIdUserProfile;
}
