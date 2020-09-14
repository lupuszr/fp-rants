export type Pair<A, B> = [A, B] & { readonly __tag: unique symbol };

export const mkPair = <A, B>(a: A, b: B): Pair<A, B> => [a, b] as Pair<A, B>;

// Projections
export const fst = <A, B>(p: Pair<A, B>): A => p[0];
export const snd = <A, B>(p: Pair<A, B>): B => p[1];
// const fishCompose =
