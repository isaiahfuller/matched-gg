import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  deserializeUser(
    payload: any,
    done: (err: any, payload: string) => void,
  ): any {
    done(null, payload);
  }
  serializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user);
  }
}
