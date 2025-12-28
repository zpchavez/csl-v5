export function getMetadataJoins() {
  return `JOIN metadata_titles ON metadata_main.title_id = metadata_titles.title_id
      JOIN metadata_author_title_map ON metadata_author_title_map.title_id = metadata_titles.title_id
      JOIN metadata_authors ON metadata_authors.author_id = metadata_author_title_map.author_id
      LEFT JOIN metadata_character_map ON metadata_character_map.episode_id = metadata_main.episode_id
      LEFT JOIN metadata_characters ON metadata_character_map.character_id = metadata_characters.character_id
      LEFT JOIN metadata_term_map ON metadata_term_map.episode_id = metadata_main.episode_id
      LEFT JOIN thesaurus_terms ON thesaurus_terms.term_id = metadata_term_map.term_id`;
}
