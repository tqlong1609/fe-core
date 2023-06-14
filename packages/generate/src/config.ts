export type ArgsValue = 'redux';

/**
 * repoUrl: GitHub repository URL
 * localDir: Local directory where you want to save the downloaded folder
 * setupPackage: Notification for install packages (if has)
 */
type Configs = {
  repoUrl: string;
  localDir: string;
  setupPackage?: string;
};

export const configs: Record<ArgsValue, Configs> = {
  // npx front-end-common --generate redux
  redux: {
    repoUrl: '/packages/react-redux/src',
    localDir: './redux',
    setupPackage: '@reduxjs/toolkit react-redux',
  },
};
