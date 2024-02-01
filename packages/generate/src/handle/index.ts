import { configs } from '../config';
import { GITHUB_REPO_URL } from '../constants';
import { downloadFileUrl } from '../utils';
import { HooksConfig, HooksType } from '../utils/type';

export const handleRelatedHooks = (
  relatedHooks: HooksType[],
  setupPackage: string[] | undefined
) => {
  relatedHooks.map((hook) => {
    const { repoUrl, localDir } = (configs as HooksConfig)['hooks'][hook];
    downloadFileUrl(GITHUB_REPO_URL + repoUrl, localDir)
      .then(() => {
        console.log(`The related ${hook} hook is downloaded successfully.`);
        if (setupPackage) {
          console.log(`Please setup packages: ${setupPackage.join(', ')}`);
        }
      })
      .catch((error) => {
        console.error(`The related ${hook} hook is download fail: `, error);
      });
  });
};
