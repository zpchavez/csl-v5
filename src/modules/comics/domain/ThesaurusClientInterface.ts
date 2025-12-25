import type { TermDetails } from "./TermEntity";

export interface ThesaurusClientInterface {
  getTermsDetails(termId: number): Promise<TermDetails | false>;
}
