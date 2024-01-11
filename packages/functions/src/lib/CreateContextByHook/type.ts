export type Selector<Value> = (value: Value) => any;

type SelectorHooks<Selectors> = {
  [K in keyof Selectors]: () => Selectors[K] extends (...args: any) => infer R
    ? R
    : never;
};

export type Hooks<
  Value,
  Selectors extends Selector<Value>[]
> = Selectors['length'] extends 0 ? [() => Value] : SelectorHooks<Selectors>;

export type ConstateTuple<Props, Value, Selectors extends Selector<Value>[]> = [
  React.FC<React.PropsWithChildren<Props>>,
  ...Hooks<Value, Selectors>
];
