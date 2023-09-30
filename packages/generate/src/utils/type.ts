export type ArgsValue = 'redux' | 'hooks' | 'modules';

export type HooksType =
  | 'copy-clipboard'
  | 'copy-clipboard-component-image'
  | 'session-storage-tabs'
  | 'count-down'
  | 'interval';

export type ModulesType = 'services';

/**
 * repoUrl: GitHub repository URL
 * localDir: Local directory where you want to save the downloaded folder
 * setupPackage: Notification for install packages (if has)
 */

export type HooksConfig = Record<
  'hooks',
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
  'modules',
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
