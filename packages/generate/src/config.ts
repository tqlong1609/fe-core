export type ArgsValue = 'redux' | 'hooks';
export type HooksType =
  | 'copy-clipboard'
  | 'copy-clipboard-component-image'
  | 'session-storage-tabs';

/**
 * repoUrl: GitHub repository URL
 * localDir: Local directory where you want to save the downloaded folder
 * setupPackage: Notification for install packages (if has)
 */
export type Configs = {
  typeFile: 'file' | 'folder';
  repoUrl: string;
  localDir: string;
  setupPackage?: string;
};

export const configs: Record<ArgsValue, Configs | Record<HooksType, Configs>> =
  {
    // npx @tqlong1609/generate --generate redux
    redux: {
      typeFile: 'folder',
      repoUrl: '/packages/react-redux/src',
      localDir: './redux',
      setupPackage: '@reduxjs/toolkit react-redux',
    },
    // npx @tqlong1609/generate --generate hooks --type {type}
    hooks: {
      'copy-clipboard': {
        typeFile: 'file',
        repoUrl: '/packages/hooks/src/lib/useCopyToClipboard.ts',
        localDir: './useCopyToClipboard.ts',
      },
      'copy-clipboard-component-image': {
        typeFile: 'file',
        repoUrl: '/packages/hooks/src/lib/useCopyComponentImageToClipboard.ts',
        localDir: './useCopyComponentImageToClipboard.ts',
        setupPackage: 'html2canvas',
      },
      'session-storage-tabs': {
        typeFile: 'file',
        repoUrl: '/packages/hooks/src/lib/useSessionStorageTabs.ts',
        localDir: './useSessionStorageTabs.ts',
      },
    },
  };
