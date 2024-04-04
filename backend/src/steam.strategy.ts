import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) { 
private readonly logger = new Logger(SteamStrategy.name);
    constructor(){
        super({
          returnURL: 'http://localhost:3000/',
          realm: 'http://localhost:3000/',
          apiKey: '',
        }, async (identifier, profile, done) => {
          await this.validate({identifier, profile, done})
        })
    }
    
    async validate({identifier, profile, done}) {
      this.logger.log({identifier, profile})
      return null
    }
  }