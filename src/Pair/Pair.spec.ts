// import { Pair } from './../Product/Product';
import * as Pair from './Pair';

describe('Pair definition', () => {

  // beforeAll(async () => {});

  it('returns the first element of a product', () => {
    const pair = Pair.mkPair(10, "Hello");
    expect(Pair.fst(pair)).toBe(10);
  });

  it('returns the second element of a Pair', () => {
    const pair = Pair.mkPair(10, "Hello");
    expect(Pair.snd(pair)).toEqual("Hello");
  });
});
