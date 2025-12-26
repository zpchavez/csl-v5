export type PreferredTerm = {
  term_id: number;
  term: string;
  is_preferred: true;
  usageCount: number;
};

export type NonPreferredTerm = {
  term_id: number;
  term: string;
  is_preferred: false;
};

export type Term = PreferredTerm | NonPreferredTerm;

export type PreferredTermDetails = {
  term: PreferredTerm;
  related_terms: PreferredTerm[];
  broader_terms: PreferredTerm[];
  narrower_terms: PreferredTerm[];
  used_for_terms: NonPreferredTerm[];
};

export type NonPreferredTermDetails = {
  term: NonPreferredTerm;
  use_terms: PreferredTerm[];
};

export type TermDetails = PreferredTermDetails | NonPreferredTermDetails;

export const isPreferredTerm = (term: Term): term is PreferredTerm => {
  return term.is_preferred === true;
};
