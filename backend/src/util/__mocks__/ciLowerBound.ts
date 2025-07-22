// g4mr/backend/src/util/__mocks__/ciLowerBound.ts

const ciLowerBound = jest.fn().mockImplementation((basePos, baseN) => {
  const n = isNaN(baseN) || baseN === 0 ? 1 : baseN;
  const pos = isNaN(basePos) || basePos === 0 ? 1 : baseN; // Assuming it should be `basePos` instead of `baseN`
  if (!n) return 0;
  const z = 1.96;
  const phat = (1.0 * pos) / n;
  return (
    (phat +
      (z * z) / (2 * n) -
      z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) /
    (1 + (z * z) / n)
  );
});

export default ciLowerBound;
