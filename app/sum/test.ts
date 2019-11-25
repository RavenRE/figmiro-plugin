import {sum} from './index';

describe('"sum" function can summarize', () => {
  test('2 + 3 = 5', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
