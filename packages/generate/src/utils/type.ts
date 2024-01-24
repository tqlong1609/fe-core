export type ArgsValue = 'redux' | 'hooks' | 'modules' | 'functions';

export type HooksType =
  | 'copy-clipboard'
  | 'copy-clipboard-component-image'
  | 'session-storage-tabs'
  | 'interval'
  | 'query-params'
  | 'window-size'
  | 'visible-page';

export type ModulesType = 'services' | 'timer';

export type FunctionsType =
  | 'location-state-singleton'
  | 'create-context-by-hook';

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
    }
  >
>;

export type ConfigsType = HooksConfig | ModulesConfig | FunctionsConfig;
