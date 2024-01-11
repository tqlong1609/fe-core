import { useState } from 'react';
import CreateContextByHook from '.';

type ExampleContext = {};

function useExample() {
  const [data, setData] = useState<ExampleContext>({});

  return { ...data, setData };
}

export const [ExampleProvider, useExampleContext] =
  CreateContextByHook(useExample);

const {} = useExampleContext();
