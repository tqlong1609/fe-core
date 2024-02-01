import { configs } from '../config';
import { GITHUB_REPO_URL } from '../constants';
import { handleRelatedHooks } from '../handle';
import { Generate } from '../interface/generate';
import { downloadFileUrl } from '../utils';
import { HooksConfig, HooksType } from '../utils/type';

export class HooksGenerate implements Generate {
  type: HooksType;

  constructor(type: HooksType) {
    this.type = type;
  }

  handle() {
    const { localDir, repoUrl, relatedHooks, setupPackage } = (
      configs as HooksConfig
    )['hooks'][this.type];

    downloadFileUrl(GITHUB_REPO_URL + repoUrl, localDir)
      .then(() => {
        console.log(`The ${this.type} hook is downloaded successfully.`);
        if (setupPackage) {
          console.log(`Please setup packages: ${setupPackage.join(', ')}`);
        }
      })
      .catch((error) => {
        console.error(`File ${this.type} download fail: `, error);
      });

    // Handle related hooks
    if (relatedHooks && relatedHooks?.length > 0) {
      handleRelatedHooks(relatedHooks, setupPackage);
    }
  }
}
