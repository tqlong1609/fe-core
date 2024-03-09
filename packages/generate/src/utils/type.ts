export type ArgsValue = 'redux' | 'hooks' | 'modules' | 'functions';

export type HooksType =
  | 'copy-clipboard'
  | 'copy-clipboard-component-image'
  | 'session-storage-tabs'
  | 'interval'
  | 'query-params'
  | 'window-size'
  | 'visible-page'
  | 'is-visible'
  | 'is-mobile';

export const hooksType: HooksType[] = [
  'copy-clipboard',
  'copy-clipboard-component-image',
  'session-storage-tabs',
  'interval',
  'query-params',
  'window-size',
  'visible-page',
  'is-visible',
  'is-mobile',
];

export type ModulesType =
  | 'services'
  | 'timer'
  | 'context'
  | 'filter'
  | 'pagination'
  | 'verify-code-phone';

export const modulesType: ModulesType[] = [
  'services',
  'timer',
  'context',
  'filter',
  'pagination',
  'verify-code-phone',
];

export type FunctionsType =
  | 'location-state-singleton'
  | 'create-context-by-hook'
  | 'lazy-load-component'
  | 'log-error'
  | 'cookies'
  | 'sheets-api';

export const functionsType: FunctionsType[] = [
  'location-state-singleton',
  'create-context-by-hook',
  'lazy-load-component',
  'log-error',
  'cookies',
  'sheets-api',
];

export type GenerateType = HooksType | ModulesType | FunctionsType;

/**
 * repoUrl: GitHub repository URL
 * localDir: Local directory where you want to save the downloaded folder
 * setupPackage: Notification for install packages (if has)
 */

type ArgsType<T extends ArgsValue> = T;

export type HooksConfig = Record<
  ArgsType<'hooks'>,
  Record<
    HooksType,
    {
      typeFile: 'file';
      repoUrl: string;
      localDir: string;
      setupPackage?: string[];
      relatedHooks?: HooksType[];
    }
  >
>;

export type ModulesConfig = Record<
  ArgsType<'modules'>,
  Record<
    ModulesType,
    {
      typeFile: 'folder';
      repoUrl: string;
      localDir: string;
      setupPackage?: string[];
      relatedHooks?: HooksType[];
    }
  >
>;

export type FunctionsConfig = Record<
  ArgsType<'functions'>,
  Record<
    FunctionsType,
    {
      typeFile: 'folder';
      repoUrl: string;
      localDir: string;
      setupPackage?: string[];
      relatedHooks?: HooksType[];
    }
  >
>;

export type ConfigsType = HooksConfig | ModulesConfig | FunctionsConfig;
