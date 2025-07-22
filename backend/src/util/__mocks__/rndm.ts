export const rndm = jest
  .fn()
  .mockImplementation(
    (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  );
