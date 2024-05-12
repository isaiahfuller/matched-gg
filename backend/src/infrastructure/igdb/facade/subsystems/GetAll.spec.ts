import igdb from 'igdb-api-node';
import { GetAll } from './GetAll';
import { Apicalypse } from 'apicalypse';
import { GameField } from './enums/fields/GameField';
import { IgdbResources } from './enums/IgdbResources';

describe('GetAll', () => {
  let getAll: GetAll;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getAll = new GetAll(
      { accessToken: 'test', clientId: 'test' },
      Object.values(GameField),
      IgdbResources.GAMES,
    );
    getAll.client = client;
  });

  describe('execute', () => {
    it('should retrieve all games with default options', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAll.execute({}, 10);

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

      const result = await getAll.execute({ concurrency: 2 }, 10, true, 100);

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

      const result = await getAll.execute({ delay: 1000 }, 10, true, 100);

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

      const result = await getAll.execute({}, 10, true);

      expect(result).toEqual([
        { id: 1, name: 'Game 1', genre: { id: 1, name: 'Genre 1' } },
      ]);
    });

    it('should retrieve all games with non-expanded fields', async () => {
      // Mock the requestAll method of the Apicalypse client
      client.requestAll = jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'Game 1', genre: 1 }]);

      const result = await getAll.execute({}, 10, false);

      expect(result).toEqual([{ id: 1, name: 'Game 1', genre: 1 }]);
    });

    it('should throw an error if the request fails', async () => {
      client.requestAll = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get all games'));

      await expect(getAll.execute({}, 10)).rejects.toThrow(
        'Failed to get all games',
      );
    });
  });
});
