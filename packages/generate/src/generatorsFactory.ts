import { FunctionsGenerate } from './generators/functionsGenerate';
import { HooksGenerate } from './generators/hooksGenerate';
import { ModulesGenerate } from './generators/modulesGenerate';
import { ArgsValue } from './utils/type';
import {
  isOfFunctionsType,
  isOfHooksType,
  isOfModulesType,
} from './utils/typeCheck';

function createGenerate(generate?: ArgsValue, type?: string) {
  if (!generate || !type) {
    throw new Error('Generate and type are required!');
  }
  switch (generate) {
    case 'hooks':
      if (isOfHooksType(type)) {
        return new HooksGenerate(type);
      }
      break;
    case 'modules':
      if (isOfModulesType(type)) {
        return new ModulesGenerate(type);
      }
      break;
    case 'functions':
      if (isOfFunctionsType(type)) {
        return new FunctionsGenerate(type);
      }
      break;
    default:
      throw new Error('Invalid generate type!');
  }
  throw new Error('Invalid type');
}

export { createGenerate };
