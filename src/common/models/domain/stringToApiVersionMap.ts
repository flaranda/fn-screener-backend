import { ApiVersion } from './ApiVersion';

export const stringToApiVersionMap: {
  [TKey: string]: ApiVersion;
} = {
  v1: ApiVersion.v1,
};
