import { configs } from '../config';
import { GITHUB_REPO_URL } from '../constants';
import { handleRelatedHooks } from '../handle';
import { Generate } from '../interface/generate';
import { downloadFolder } from '../utils';
import { FunctionsConfig, FunctionsType } from '../utils/type';

export class FunctionsGenerate implements Generate {
  type: FunctionsType;

  constructor(type: FunctionsType) {
    this.type = type;
  }

  handle() {
    const { localDir, repoUrl, setupPackage, relatedHooks } = (
      configs as FunctionsConfig
    )['functions'][this.type];

    downloadFolder(GITHUB_REPO_URL + repoUrl, localDir)
      .then(() => {
        console.log('Function downloaded successfully.');
        if (setupPackage) {
          console.log(`Please setup packages: ${setupPackage.join(', ')}`);
        }
      })
      .catch((error) => {
        console.error('Function download fail: ', error);
      });

    // Handle related hooks
    if (relatedHooks && relatedHooks?.length > 0) {
      handleRelatedHooks(relatedHooks, setupPackage);
    }
  }
}
