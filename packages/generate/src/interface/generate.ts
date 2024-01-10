import { GenerateType } from '../utils/type';

export interface Generate {
  type: GenerateType;
  handle(): void;
}
