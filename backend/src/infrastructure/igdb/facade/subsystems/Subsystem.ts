import { Apicalypse } from 'apicalypse';
import { IgdbSubsystem } from './interfaces';

export abstract class Subsystem implements IgdbSubsystem {
  client: Apicalypse;

  constructor(client: Apicalypse) {
    this.client = client;
  }
}
