import igdb from 'igdb-api-node';
import { GetTotalGameCount } from './GetTotalGameCount';
import { Apicalypse } from 'apicalypse';

describe('GetTotalGameCount', () => {
  let getTotalGameCount: GetTotalGameCount;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getTotalGameCount = new GetTotalGameCount(client);
  });

  describe('prepare', () => {
    it('should prepare the GetTotalGameCount instance for execution', async () => {
      await getTotalGameCount.prepare();
      // Add your assertions here
    });
  });

  describe('execute', () => {
    it('should retrieve the total count of games', async () => {
      // Mock the request method of the Apicalypse client
      client.request = jest
        .fn()
        .mockResolvedValue({ status: 200, data: { count: 100 } });

      const result = await getTotalGameCount.execute();

      expect(result).toBe(100);
    });

    it('should throw an error if the request fails', async () => {
      // Mock the request method of the Apicalypse client to simulate a failure
      client.request = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get total game count'));

      await expect(getTotalGameCount.execute()).rejects.toThrow(
        'Failed to get total game count',
      );
    });
  });
});
