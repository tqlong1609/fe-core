#! /usr/bin/env node
import yargs from 'yargs';
import { GITHUB_REPO_URL } from '../constants';
import { downloadFolder } from '../utils';
import { ArgsValue, configs } from '../config';
const { generate } = yargs.argv as any;

if (generate && configs[generate as ArgsValue]) {
  const { repoUrl, localDir, setupPackage } = configs[generate as ArgsValue];
  if (repoUrl && localDir) {
    // // Download the folder from the repository
    downloadFolder(GITHUB_REPO_URL + repoUrl, localDir)
      .then(() => {
        console.log('Folder downloaded successfully.');
        if (setupPackage) {
          console.log(`Please setup packages: ${setupPackage}`);
        }
      })
      .catch((error) => {
        console.error('Folder download fail: ', error);
      });
  }
} else {
  console.log('Command not found!');
  process.exit(0);
}
