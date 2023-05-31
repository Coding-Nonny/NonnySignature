const check = require('./test1');

test('should return the sum of two numbers', () => {
  const result = check(2, 3);
  expect(result).toBe(5);
});
