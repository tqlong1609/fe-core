import { configs } from '../config';
import { GITHUB_REPO_URL } from '../constants';
import { handleRelatedHooks } from '../handle';
import { Generate } from '../interface/generate';
import { downloadFolder } from '../utils';
import { ModulesConfig, ModulesType } from '../utils/type';

export class ModulesGenerate implements Generate {
  type: ModulesType;

  constructor(type: ModulesType) {
    this.type = type;
  }

  handle() {
    const { localDir, repoUrl, setupPackage, relatedHooks } = (
      configs as ModulesConfig
    )['modules'][this.type];

    downloadFolder(GITHUB_REPO_URL + repoUrl, localDir)
      .then(() => {
        console.log('Module downloaded successfully.');
        if (setupPackage) {
          console.log(`Please setup packages: ${setupPackage.join(', ')}`);
        }
      })
      .catch((error) => {
        console.error('Module download fail: ', error);
      });

    // Handle related hooks
    if (relatedHooks && relatedHooks?.length > 0) {
      handleRelatedHooks(relatedHooks, setupPackage);
    }
  }
}
