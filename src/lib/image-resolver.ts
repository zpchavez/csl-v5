import { config } from "src/config";

export function resolveCoverImagePath(coverValueFromDb: string): string {
  return `${config.s3BucketUrl}/covers/${coverValueFromDb}`;
}
