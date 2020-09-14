import { Pair, mkPair } from "../Pair/Pair";

export type Writer<A> = Pair<A, string> & { readonly __tag1: unique symbol };

export const mkWriter = <A>(a: A, s: string): Writer<A> => mkPair(a, s) as Writer<A>;

export const fish = <A, B>(ab: (a: A) => Writer<B>) => <C>(bc: (b: B) => Writer<C>): ((a: A) => Writer<C>) => {
  return x => {
    const [y, s1] = ab(x);
    const [z, s2] = bc(y);
    return mkWriter(z, s1 + s2)
  }
};

const id = <A>(a: Writer<A>): Writer<A> => a;
export const compose = fish;
export const return1= <A>(a: A): Writer<A> => mkWriter(a, "");
export const map = <A, B>(f: (a: A) => B): (a: Writer<A>) => Writer<B> =>  fish((a: Writer<A>) => id(a))((x: A) => return1(f(x)));
