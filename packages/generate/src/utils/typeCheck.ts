import {
  FunctionsType,
  HooksType,
  ModulesType,
  functionsType,
  hooksType,
  modulesType,
} from './type';

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
