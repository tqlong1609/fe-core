#! /usr/bin/env node
import yargs from 'yargs';
import { createGenerate } from '../generatorsFactory';

const { generate, type } = yargs.argv as unknown as {
  generate: string;
  type: string;
};

try {
  const handler = createGenerate(generate, type);
  handler.handle();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message ?? 'Command not found!');
  } else {
    console.log('An unknown error occurred.');
  }
  process.exit(0);
}
