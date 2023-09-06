#! /usr/bin/env node
import yargs from 'yargs';
import { ArgsValue, Configs, HooksType, configs } from '../config';
import { GITHUB_REPO_URL } from '../constants';
import { downloadFileUrl, downloadFolder } from '../utils';
const { generate, type } = yargs.argv as unknown as {
  generate: ArgsValue;
  type: HooksType;
};

if (generate && configs[generate]) {
  const { localDir, repoUrl, typeFile, setupPackage, relatedHooks } = type
    ? (configs[generate] as Record<HooksType, Configs>)[type]
    : (configs[generate] as Configs);

  if (repoUrl && localDir) {
    if (typeFile === 'folder') {
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
    } else {
      downloadFileUrl(GITHUB_REPO_URL + repoUrl, localDir)
        .then(() => {
          console.log(`File ${type} downloaded successfully.`);
          if (setupPackage) {
            console.log(`Please setup packages: ${setupPackage}`);
          }
        })
        .catch((error) => {
          console.error(`File ${type} download fail: `, error);
        });
    }
    if (relatedHooks && relatedHooks?.length > 0) {
      relatedHooks.map((hook) => {
        const { repoUrl, localDir } = (
          configs['hooks'] as Record<HooksType, Configs>
        )[hook];
        if (repoUrl && localDir) {
          downloadFileUrl(GITHUB_REPO_URL + repoUrl, localDir)
            .then(() => {
              console.log(`File ${hook} downloaded successfully.`);
              if (setupPackage) {
                console.log(`Please setup packages: ${setupPackage}`);
              }
            })
            .catch((error) => {
              console.error(`File ${hook} download fail: `, error);
            });
        } else {
          console.error('Not found hook related');
        }
      });
    }
  }
} else {
  console.log('Command not found!');
  process.exit(0);
}
