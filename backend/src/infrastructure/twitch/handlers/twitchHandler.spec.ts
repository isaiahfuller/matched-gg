import axios from 'axios';
import { Logger } from 'pino';

import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import { TwitchValidTokenResponseDTO } from './DTO/TwitchValidateResponseDTO';
import TwitchHandler from './twitchHandler';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('TwitchHandler', () => {
  let twitchHandler: TwitchHandler;

  const logger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  } as unknown as Logger;

  beforeEach(() => {
    twitchHandler = new TwitchHandler(
      {
        apiUrl: 'http://localhost:3000/',
        clientId: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        clientSecret: 'hslxewai7tzeze1bbh6kj3g7fh61ex',
      },
      logger,
    );
  });

  afterEach(() => {
    twitchHandler.stopTokenValidationInterval();
    mockAxios.get.mockReset();
    mockAxios.post.mockReset();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should connect to Twitch API', async () => {
    mockAxios.post.mockResolvedValue({
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
      status: 200,
      statusText: 'OK',
    });
    const response: TwitchTokenResponseDTO = await twitchHandler.connect();
    expect(response).toBeDefined();
    expect(response.access_token).toBeDefined();
    expect(response.expires_in).toBeDefined();
  });

  it('should throw an error if connection fails', async () => {
    mockAxios.post.mockRejectedValue(
      new Error('Failed to connect to Twitch API'),
    );
    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to connect to Twitch API',
    );
  });

  it('should throw an error if there is no response from Twitch API', async () => {
    mockAxios.post.mockResolvedValue({});

    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to connect to Twitch API',
    );
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.post.mockResolvedValue({
      data: null,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to connect to Twitch API',
    );
  });

  it('should throw an error if it fails to receive a token', async () => {
    mockAxios.post.mockResolvedValue({
      data: { null: null },
      status: 200,
      statusText: 'OK',
    });

    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to get access token',
    );
  });

  it('it should validate token', async () => {
    mockAxios.post.mockResolvedValue({
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
      status: 200,
      statusText: 'OK',
    });
    mockAxios.get.mockResolvedValue({
      data: {
        client_id: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
      },
      status: 200,
      statusText: 'OK',
    });
    await twitchHandler.connect();
    const response =
      (await twitchHandler.validateToken()) as TwitchValidTokenResponseDTO;
    expect(response.expires_in).toBeDefined();
    expect(response.client_id).toBeDefined();
    expect(response.expires_in).toBeGreaterThan(0);
  });

  it("should throw an error if there's no token to validate", async () => {
    const twitchHandler = new TwitchHandler(
      {
        apiUrl: 'http://localhost:3000/',
        clientId: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        clientSecret: 'hslxewai7tzeze1bbh6kj3g7fh61ex',
      },
      logger,
    );
    await expect(twitchHandler.validateToken()).rejects.toThrow();
  });

  it('should refresh token', async () => {
    mockAxios.post.mockResolvedValue({
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
      status: 200,
      statusText: 'OK',
    });
    mockAxios.get.mockResolvedValue({
      data: {
        message: 'invalid access token',
        status: 401,
      },
      status: 401,
    });
    await twitchHandler.connect();
    const response =
      (await twitchHandler.validateToken()) as TwitchTokenResponseDTO;
    expect(response).toBeDefined();
    expect(response.expires_in).toBeDefined();
    expect(response.access_token).toBeDefined();
  });
});
