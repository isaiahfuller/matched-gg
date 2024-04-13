import igdb from 'igdb-api-node';
import { GetAllGames } from './GetAllGames';
import { Apicalypse } from 'apicalypse';

describe('GetAllGames', () => {
  let getAllGames: GetAllGames;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getAllGames = new GetAllGames('test', 'test');
    getAllGames.client = client;
  });

  describe('prepare', () => {
    it('should prepare the GetAllGames instance for execution', async () => {
      await getAllGames.prepare();
    });
  });

  describe('execute', () => {
    it('should retrieve all games with default options', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAllGames.execute({}, 10);

      expect(result).toEqual([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);
    });

    it('should retrieve all games with concurrency', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAllGames.execute(
        { concurrency: 2 },
        10,
        true,
        100,
      );

      expect(result).toEqual([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);
    });

    it('should retrieve all games with delay', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAllGames.execute({ delay: 1000 }, 10, true, 100);

      expect(result).toEqual([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);
    });

    it('should retrieve all games with expanded fields', async () => {
      // Mock the requestAll method of the Apicalypse client
      client.requestAll = jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'Game 1', genre: { id: 1, name: 'Genre 1' } },
        ]);

      const result = await getAllGames.execute({}, 10, true);

      expect(result).toEqual([
        { id: 1, name: 'Game 1', genre: { id: 1, name: 'Genre 1' } },
      ]);
    });

    it('should retrieve all games with non-expanded fields', async () => {
      // Mock the requestAll method of the Apicalypse client
      client.requestAll = jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'Game 1', genre: 1 }]);

      const result = await getAllGames.execute({}, 10, false);

      expect(result).toEqual([{ id: 1, name: 'Game 1', genre: 1 }]);
    });

    it('should throw an error if the request fails', async () => {
      client.requestAll = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get all games'));

      await expect(getAllGames.execute({}, 10)).rejects.toThrow(
        'Failed to get all games',
      );
    });
  });
});
