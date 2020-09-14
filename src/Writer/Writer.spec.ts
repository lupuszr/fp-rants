import * as Writer from './Writer';
import * as fc from 'fast-check';

test('writer should be a pair of generic value and string', () => {
  fc.assert(
    fc.property(fc.anything(), fc.string(), (a, s) => {
      const w = Writer.mkWriter(a, s);
      const [y, s1] = w;

      expect(y).toEqual(a);
      expect(s1).toEqual(s);
    })
  );
});

test('writer fish/compose should compose together two writers', () => {
  fc.assert(
    fc.property(fc.anything(), fc.string(), fc.anything(), fc.string(), (a1, s1, a2, s2) => {
      const w1 = a => Writer.mkWriter(a, s1);
      const z = Writer.fish(w1)(w1a => Writer.mkWriter([w1a, a2], s2));

      expect(z(a1)).toEqual([[a1, a2], s1 + s2]);
    })
  );
});

test('writer map should behave as a functor', () => {
  fc.assert(
    fc.property(fc.object(), fc.string(), fc.func(fc.object()), fc.func(fc.object()), (a, s, fn1, fn2) => {
      const w = Writer.mkWriter(a, s);
      expect(Writer.map(Object.keys)(w)).toEqual([Object.keys(a), s])

      // identity law:: map(a => a) === id
      expect(Writer.map(a => a)(w)).toEqual([a, s])

      // composition law:: map(a => f(g))(x) <-> map(f)(map(g)(x))
      expect(Writer.map(a => fn1(fn2(a)))(w)).toEqual(Writer.map(fn1)(Writer.map(fn2)(w)));
     })
  );
});

test("writer return1 should initialize a writer with empty string", () => {
  fc.assert(
    fc.property(fc.anything(), (a) => {
      const w1 = Writer.return1(a);

      expect(w1).toEqual(Writer.mkWriter(a, ""));
      expect(w1).toEqual([a, ""]);
    })
  );
})
