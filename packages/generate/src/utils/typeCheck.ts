import { HooksType, ModulesType } from './type';

const hooksType: HooksType[] = [
  'copy-clipboard',
  'copy-clipboard-component-image',
  'session-storage-tabs',
  'count-down',
  'interval',
];

const modulesType: ModulesType[] = ['services'];

function isOfHooksType(value: string): value is HooksType {
  return hooksType.includes(value as HooksType);
}

function isOfModulesType(value: string): value is ModulesType {
  return modulesType.includes(value as ModulesType);
}

export { isOfHooksType, isOfModulesType };
