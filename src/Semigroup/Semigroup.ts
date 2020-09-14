export type Semigroup<A> = {
  concat1: (a1: A) => (a2: A) => A
}

