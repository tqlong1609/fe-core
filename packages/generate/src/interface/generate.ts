import { HooksType, ModulesType } from '../utils/type';

export interface Generate {
  type: HooksType | ModulesType;
  handle(): void;
}
