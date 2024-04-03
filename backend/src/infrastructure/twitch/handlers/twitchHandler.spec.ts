import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import { TwitchValidTokenResponseDTO } from './DTO/TwitchValidateResponseDTO';
import { Logger } from 'pino';
import TwitchHandler from './twitchHandler';
import axios from 'axios';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('TwitchHandler', () => {
  let twitchHandler: TwitchHandler;

  const logger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  } as unknown as Logger;

  beforeEach(() => {
    twitchHandler = new TwitchHandler(
      {
        clientId: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        clientSecret: 'hslxewai7tzeze1bbh6kj3g7fh61ex',
        apiUrl: 'http://localhost:3000/',
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
      statusText: 'OK',
      status: 200,
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
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
      statusText: 'Internal Server Error',
      status: 500,
      data: null,
    });

    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to connect to Twitch API',
    );
  });

  it('should throw an error if it fails to receive a token', async () => {
    mockAxios.post.mockResolvedValue({
      statusText: 'OK',
      status: 200,
      data: { null: null },
    });

    await expect(twitchHandler.connect()).rejects.toThrow(
      'Failed to get access token',
    );
  });

  it('it should validate token', async () => {
    mockAxios.post.mockResolvedValue({
      statusText: 'OK',
      status: 200,
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
    });
    mockAxios.get.mockResolvedValue({
      statusText: 'OK',
      status: 200,
      data: {
        client_id: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
      },
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
        clientId: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        clientSecret: 'hslxewai7tzeze1bbh6kj3g7fh61ex',
        apiUrl: 'http://localhost:3000/',
      },
      logger,
    );
    await expect(twitchHandler.validateToken()).rejects.toThrow();
  });

  it('should refresh token', async () => {
    mockAxios.post.mockResolvedValue({
      statusText: 'OK',
      status: 200,
      data: {
        access_token: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
        expires_in: 500000,
        token_type: 'bearer',
      },
    });
    mockAxios.get.mockResolvedValue({
      status: 401,
      data: {
        status: 401,
        message: 'invalid access token',
      },
    });
    await twitchHandler.connect();
    const response =
      (await twitchHandler.validateToken()) as TwitchTokenResponseDTO;
    expect(response).toBeDefined();
    expect(response.expires_in).toBeDefined();
    expect(response.access_token).toBeDefined();
  });
});
