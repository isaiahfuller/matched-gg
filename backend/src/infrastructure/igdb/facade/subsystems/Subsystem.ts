import { Apicalypse } from 'apicalypse';
import { IgdbSubsystem } from './interfaces';
import igdb from 'igdb-api-node';
import { responseFieldsInterceptor } from './util/responseFieldsInterceptor';
import { requestFieldsInterceptor } from './util/requestFieldsInterceptor';
import { AllField } from './types';
import { CountDTO } from './DTO/CountDTO';
import { IgdbConfig } from '@config/interfaces';

/**
 * The default timeout value in milliseconds.
 */
const DEFAULT_TIMEOUT = 60000;

/**
 * Configuration options for the interceptor client.
 */
interface InterceptorClientConfig {
  timeout: number;
  fields: AllField;
  count: CountDTO['count'];
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
  protected clientId: IgdbConfig['clientId'];
  protected accessToken: IgdbConfig['accessToken'];

  /**
   * Constructs a new InterceptorSubsystem instance.
   * You must run `setInterceptorClient` before the first request.
   * @param clientId - The client ID for the IGDB API.
   * @param accessToken - The access token for the IGDB API.
   */
  constructor({ clientId, accessToken }: IgdbConfig) {
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
    timeout = DEFAULT_TIMEOUT,
    fields,
    count,
  }: InterceptorClientConfig): void {
    this.client = igdb(this.clientId, this.accessToken, {
      timeout,
      transformRequest: (data) => requestFieldsInterceptor(data, fields, count),
      transformResponse: (response) =>
        responseFieldsInterceptor(response, fields),
    });
  }
}
