import { ConfigsType } from './utils/type';
//
export const configs: ConfigsType = {
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
      setupPackage: ['html2canvas'],
    },
    'session-storage-tabs': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useSessionStorageTabs.ts',
      localDir: './useSessionStorageTabs.ts',
    },
    'count-down': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useCountDown.ts',
      localDir: './useCountDown.ts',
      relatedHooks: ['interval'],
    },
    interval: {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useInterval.ts',
      localDir: './useInterval.ts',
    },
    'query-params': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useQueryParams.ts',
      localDir: './useQueryParams.ts',
    },
  },
  // npx @tqlong1609/generate --generate modules --type {type}
  modules: {
    services: {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/services',
      localDir: './services',
      setupPackage: ['axios', 'axios-mock-adapter', 'zod'],
    },
  },
  // npx @tqlong1609/generate --generate functions --type {type}
  functions: {
    'location-state-singleton': {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/LocationStateSingleton',
      localDir: './LocationStateSingleton',
    },
    'create-context-by-hook': {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/CreateContextByHook',
      localDir: './CreateContextByHook',
    },
  },
};
