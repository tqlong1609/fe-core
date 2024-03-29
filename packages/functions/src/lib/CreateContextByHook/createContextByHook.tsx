import * as React from 'react';
import { ConstateTuple, Hooks, Selector } from './type';

const isDev = process.env['NODE_ENV'] !== 'production';

const NO_PROVIDER = {};

function createUseContext(context: React.Context<any>): any {
  return () => {
    const value = React.useContext(context);
    if (isDev && value === NO_PROVIDER) {
      const warnMessage = context.displayName
        ? `The context consumer of ${context.displayName} must be wrapped with its corresponding Provider`
        : 'Component must be wrapped with Provider.';
      console.warn(warnMessage);
    }
    return value;
  };
}

function createContextByHook<Props, Value, Selectors extends Selector<Value>[]>(
  useValue: (props: Props) => Value,
  ...selectors: Selectors
): ConstateTuple<Props, Value, Selectors> {
  const contexts = [] as React.Context<any>[];
  const hooks = [] as unknown as Hooks<Value, Selectors>;

  const createContext = (displayName: string) => {
    const context = React.createContext(NO_PROVIDER);
    if (isDev && displayName) {
      context.displayName = displayName;
    }
    contexts.push(context);
    hooks.push(createUseContext(context));
  };

  if (selectors.length) {
    selectors.forEach((selector) => createContext(selector.name));
  } else {
    createContext(useValue.name);
  }

  const Provider: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    ...props
  }) => {
    const value = useValue(props as Props);
    let element = children as React.ReactElement;
    for (let i = 0; i < contexts.length; i += 1) {
      const context = contexts[i];
      const selector = selectors[i] || ((v) => v);
      element = (
        <context.Provider value={selector(value)}>{element}</context.Provider>
      );
    }
    return element;
  };

  if (isDev && useValue.name) {
    Provider.displayName = 'ContextByHook';
  }

  return [Provider, ...hooks];
}

export default createContextByHook;
