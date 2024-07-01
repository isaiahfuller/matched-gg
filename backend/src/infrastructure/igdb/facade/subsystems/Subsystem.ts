import { IgdbConfig } from '@config/interfaces';
import { Apicalypse } from 'apicalypse';
import igdb from 'igdb-api-node';

import { CountDTO } from './DTO/CountDTO';
import { IgdbSubsystem } from './interfaces';
import { IgdbField } from './types';
import { requestFieldsInterceptor } from './util/requestFieldsInterceptor';
import { responseFieldsInterceptor } from './util/responseFieldsInterceptor';

/**
 * The default timeout value in milliseconds.
 */
const DEFAULT_TIMEOUT = 60000;

/**
 * Configuration options for the interceptor client.
 */
interface InterceptorClientConfig {
  count: CountDTO['count'];
  fields: IgdbField;
  timeout: number;
}

/**
 * Abstract class representing a subsystem in the IGDB facade.
 * Subsystems are responsible for interacting with specific endpoints of the IGDB API.
 */
export abstract class Subsystem implements IgdbSubsystem {
  client: Apicalypse;

  constructor(client: Apicalypse) {
    this.client = client;
  }
}

/**
 * Abstract class representing an interceptor subsystem.
 * Extends the base Subsystem class.
 */
export abstract class InterceptorSubsystem extends Subsystem {
  protected accessToken: IgdbConfig['accessToken'];
  protected clientId: IgdbConfig['clientId'];

  /**
   * Constructs a new InterceptorSubsystem instance.
   * You must run `setInterceptorClient` before the first request.
   * @param clientId - The client ID for the IGDB API.
   * @param accessToken - The access token for the IGDB API.
   */
  constructor({ accessToken, clientId }: IgdbConfig) {
    super(igdb(clientId, accessToken));
    this.clientId = clientId;
    this.accessToken = accessToken;
  }

  /**
   * Sets the interceptor client configuration.
   * Calculates the percentage of remaining fields to request & asserts the requested fields.
   * @param config - The configuration options for the interceptor client.
   */
  setInterceptorClient({
    count,
    fields,
    timeout = DEFAULT_TIMEOUT,
  }: InterceptorClientConfig): void {
    this.client = igdb(this.clientId, this.accessToken, {
      timeout,
      transformRequest: (data) => requestFieldsInterceptor(data, fields, count),
      transformResponse: (response) =>
        responseFieldsInterceptor(response, fields),
    });
  }
}
