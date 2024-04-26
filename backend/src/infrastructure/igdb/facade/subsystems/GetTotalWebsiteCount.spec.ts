import igdb from 'igdb-api-node';
import { GetTotalWebsiteCount } from './GetTotalWebsiteCount';
import { Apicalypse } from 'apicalypse';

describe('GetTotalWebsiteCount', () => {
  let getTotalWebsiteCount: GetTotalWebsiteCount;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getTotalWebsiteCount = new GetTotalWebsiteCount(client);
  });

  describe('execute', () => {
    it('should retrieve the total count of websites', async () => {
      // Mock the request method of the Apicalypse client
      client.request = jest
        .fn()
        .mockResolvedValue({ status: 200, data: { count: 100 } });

      const result = await getTotalWebsiteCount.execute();

      expect(result).toBe(100);
    });

    it('should throw an error if the request fails', async () => {
      // Mock the request method of the Apicalypse client to simulate a failure
      client.request = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get total website count'));

      await expect(getTotalWebsiteCount.execute()).rejects.toThrow(
        'Failed to get total website count',
      );
    });
  });
});
