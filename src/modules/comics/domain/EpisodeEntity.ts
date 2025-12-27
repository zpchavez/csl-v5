import type { PreferredTerm } from "src/modules/comics/domain/TermEntity";

export type EpisodeEntity = {
  episode_id: number;
  title_id: number;
  author_id: number;
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

export type EpisodeTerm = PreferredTerm;

export type EpisodeCharacter = {
  character_id: number;
  name: string;
};

export type EpisodeTerms = EpisodeTerm[];

export type EpisodeCharacters = EpisodeCharacter[];
