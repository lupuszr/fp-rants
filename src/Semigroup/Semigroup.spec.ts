import  { Semigroup } from './Semigroup';
import * as fc from 'fast-check';
import { Merge } from '../Utils/TypeHelpers';


type CustomStringBase = string & { readonly __tag: unique symbol };
const mkCustomStringBase = <A>(a: A) => a.toString() as CustomStringBase;
type CustomStringModule = Merge<Semigroup<CustomStringBase>, {of: <A>(a: A) => CustomStringBase}>;

const mkCustomStringModule = (): CustomStringModule => ({
  of: <A>(a: A) => mkCustomStringBase(a),
  concat1: a => b => {
    return a + b as CustomStringBase;
  }
});

const csm = mkCustomStringModule();

const x = csm.concat1(csm.of("Hello"))(csm.of("World"));
x.concat("b");

test('monoid should concat', () => {
  fc.assert(
    fc.property(fc.string(), fc.string(), (a, b) => {
      const ca = csm.of(a);
      const cb = csm.of(b);
      expect(csm.concat1(ca)(cb)).toEqual(csm.of(a + b))
    }),
  );
});

test('monoid should be associative', () => {
  fc.assert(
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      const ca = csm.of(a);
      const cb = csm.of(b);
      const cc = csm.of(c);
      expect(csm.concat1(csm.concat1(ca)(cb))(cc)).toEqual(csm.concat1(ca)(csm.concat1(cb)(cc)))
    })
  )
})
