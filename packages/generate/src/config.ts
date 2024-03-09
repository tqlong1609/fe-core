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
    'window-size': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useWindowSize.ts',
      localDir: './useWindowSize.ts',
    },
    'visible-page': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useVisiblePage.ts',
      localDir: './useVisiblePage.ts',
    },
    'is-visible': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useIsVisible.ts',
      localDir: './useIsVisible.ts',
    },
    'is-mobile': {
      typeFile: 'file',
      repoUrl: '/packages/hooks/src/lib/useIsMobile.ts',
      localDir: './useIsMobile.ts',
      relatedHooks: ['window-size'],
    },
  },
  // npx @tqlong1609/generate --generate modules --type {type}
  modules: {
    services: {
      typeFile: 'folder',
      repoUrl: '/packages/modules/src/lib/services',
      localDir: './services',
      setupPackage: ['axios', 'axios-mock-adapter', 'zod'],
    },
    timer: {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/timer',
      localDir: './timer',
      setupPackage: ['React', 'moment'],
      relatedHooks: ['visible-page'],
    },
    context: {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/context',
      localDir: './context',
    },
    filter: {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/filter',
      localDir: './filter',
      setupPackage: ['React', 'moment'],
      relatedHooks: ['query-params'],
    },
    pagination: {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/pagination',
      localDir: './pagination',
    },
    'verify-code-phone': {
      typeFile: 'folder',
      repoUrl: '/packages/app-demo/modules/verify-code-phone',
      localDir: './verify-code-phone',
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
    'lazy-load-component': {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/LazyLoadComponent',
      localDir: './LazyLoadComponent',
      relatedHooks: ['is-mobile', 'is-visible', 'window-size'],
    },
    'log-error': {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/LogError',
      localDir: './LogError',
    },
    cookies: {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/Cookies',
      localDir: './Cookies',
    },
    'sheets-api': {
      typeFile: 'folder',
      repoUrl: '/packages/functions/src/lib/SheetsApi',
      localDir: './SheetsApi',
      setupPackage: ['googleapis'],
    },
  },
};
