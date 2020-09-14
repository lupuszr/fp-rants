import type { Writer } from './Writer';
import * as W from './Writer';
describe('Writer usage', () => {

  // Act before assertions
  // beforeAll(async () => {});

  it('Can be used for logging', () => {
    // Initialize a writer for numbers
    // const logger = W.return1(0);
    const add = (a: number) => (b: number): Writer<number> => W.mkWriter(a + b, `Addition for ${a} & ${b},`);
    const substract = (a: number) => (b: number): Writer<number> => W.mkWriter(a - b, `Substract for ${a} & ${b},`);

    const add10 = W.fish(W.return1)(add(10));
    const substract5 = W.fish(W.return1)(substract(5));
    expect(add10(0)).toEqual([10, 'Addition for 10 & 0,']);
    expect(substract5(20)).toEqual([-15, 'Substract for 5 & 20,']);

    const substract5AndAdd10 = W.fish(add10)(substract5);
    expect(substract5AndAdd10(20)).toEqual([-25, "Addition for 10 & 20,Substract for 5 & 30,"])
  });
});
