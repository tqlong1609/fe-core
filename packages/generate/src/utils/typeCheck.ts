import { FunctionsType, HooksType, ModulesType } from './type';

const hooksType: HooksType[] = [
  'copy-clipboard',
  'copy-clipboard-component-image',
  'session-storage-tabs',
  'count-down',
  'interval',
  'query-params',
];

const modulesType: ModulesType[] = ['services'];

const functionsType: FunctionsType[] = [
  'location-state-singleton',
  'create-context-by-hook',
];

function isOfHooksType(value: string): value is HooksType {
  return hooksType.includes(value as HooksType);
}

function isOfModulesType(value: string): value is ModulesType {
  return modulesType.includes(value as ModulesType);
}

function isOfFunctionsType(value: string): value is FunctionsType {
  return functionsType.includes(value as FunctionsType);
}

export { isOfHooksType, isOfModulesType, isOfFunctionsType };
