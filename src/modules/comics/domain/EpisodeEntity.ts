export type EpisodeEntity = {
  episode_id: number;
  title_id: number;
  title: string;
  author: string;
  suffix: string;
  date: Date;
  episode_title: string;
  transcript: string;
  summary: string;
};

export type EpisodeEntityWithRelations = EpisodeEntity & {
  terms: EpisodeTerms;
  characters: EpisodeCharacters;
};

export type EpisodeTerm = {
  term_id: number;
  term: string;
  usageCount: number;
};

export type EpisodeCharacter = {
  character_id: number;
  name: string;
};

export type EpisodeTerms = EpisodeTerm[];

export type EpisodeCharacters = EpisodeCharacter[];
