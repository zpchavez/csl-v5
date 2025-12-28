import { db } from "src/lib/db";
import type { PaginatedResultsType } from "src/lib/PaginatedResultsType";
import type {
  EpisodeEntity,
  EpisodeTerms,
} from "src/modules/comics/domain/EpisodeEntity";
import type {
  BrowseOptions,
  Filters,
  MetadataClientInterface,
  Option,
  TermOption,
} from "src/modules/comics/domain/MetadataClientInterface";
import { getMetadataJoins } from "src/modules/comics/infra/sqlHelper";
import { thesaurusClient } from "./thesaurusClient";

type MetadataFieldName =
  | "years"
  | "titles"
  | "authors"
  | "characters"
  | "terms";

type MetadataFieldQueryInfo = {
  name: MetadataFieldName;
  idCol: string | null;
  select: string[];
  orderBy: string;
  groupBy?: string;
};

const getWheresAndBindings = (
  filters: Filters,
  exclude: MetadataFieldName | null,
): [string, string[]] => {
  const whereStrings = [];
  const bindings = [];
  if (filters.year && exclude !== "years") {
    whereStrings.push(`strftime('%Y', date) = ?`);
    bindings.push(filters.year.toString());
  }
  if (filters.title && exclude !== "titles") {
    whereStrings.push(`metadata_titles.title_id = ?`);
    bindings.push(filters.title.toString());
  }
  if (filters.author && exclude !== "authors") {
    whereStrings.push(`metadata_authors.author_id = ?`);
    bindings.push(filters.author.toString());
  }
  if (filters.character && exclude !== "characters") {
    whereStrings.push(`metadata_characters.character_id = ?`);
    bindings.push(filters.character.toString());
  }
  if (filters.term && exclude !== "terms") {
    whereStrings.push(`thesaurus_terms.term_id = ?`);
    bindings.push(filters.term.toString());
  }
  return [whereStrings.length ? whereStrings.join(" AND ") : "true", bindings];
};

const executeQueryAsync = (
  field: MetadataFieldQueryInfo,
  filters: Filters,
): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [wheresSql, bindings] = getWheresAndBindings(filters, field.name);

      const statement = db.prepare(
        `SELECT DISTINCT ${field.select.join(", ")}
          FROM metadata_main ${getMetadataJoins()}
          WHERE ${wheresSql}
          ${field.idCol ? ` AND ${field.idCol} IS NOT NULL ` : ""}
          ${field.groupBy ? ` GROUP BY ${field.groupBy} ` : ""}
          ORDER BY ${field.orderBy}
          `,
      );

      statement.bind(bindings);

      const options: Option[] = [];

      while (statement.step()) {
        const row = statement.getAsObject();
        if (row.value && row.label) {
          options.push({
            label: row.label as string,
            value: row.value as string,
            ...(row.count ? { count: row.count as number } : {}),
          });
        }
      }

      statement.free();
      resolve(options);
    }, 0);
  });
};

export const metadataClient: MetadataClientInterface = {
  async getLatestUploadedEpisodes(limit = 10): Promise<EpisodeEntity[]> {
    const statement = db.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${getMetadataJoins()}
      ORDER BY metadata_main.episode_id DESC
      LIMIT ?
    `);

    statement.bind([limit]);

    const results: EpisodeEntity[] = [];
    while (statement.step()) {
      const row = statement.getAsObject();
      results.push({
        episode_id: row.episode_id as number,
        title_id: row.title_id as number,
        title: row.title as string,
        author_id: row.author_id as number,
        author: row.author as string,
        suffix: row.suffix as string,
        date: new Date(row.date as string),
        episode_title: row.episode_title as string,
        transcript: row.transcript as string,
        summary: row.summary as string,
        notes: row.notes as string,
      });
    }
    statement.free();

    return results;
  },

  async getBrowseOptions(filters: Filters) {
    const fields: MetadataFieldQueryInfo[] = [
      {
        name: "years",
        idCol: "date",
        select: [
          "strftime('%Y', date) AS label",
          "strftime('%Y', date) AS value",
        ],
        orderBy: "strftime('%Y', date)",
      },
      {
        name: "titles",
        idCol: "metadata_titles.title_id",
        select: [
          "metadata_titles.title_id AS value",
          "metadata_titles.title AS label",
        ],
        orderBy: "metadata_titles.title",
      },
      {
        name: "authors",
        idCol: "metadata_authors.author_id",
        select: [
          `metadata_authors.first_name || ' ' || metadata_authors.last_name AS label`,
          "metadata_authors.author_id AS value",
        ],
        orderBy: "metadata_authors.last_name",
      },
      {
        name: "characters",
        idCol: "metadata_characters.character_id",
        select: [
          "metadata_characters.character AS label",
          "metadata_characters.character_id AS value",
        ],
        orderBy: "metadata_characters.character",
      },
      {
        name: "terms",
        idCol: "thesaurus_terms.term_id",
        select: [
          "thesaurus_terms.term AS label",
          "thesaurus_terms.term_id AS value",
          "COUNT(DISTINCT metadata_main.episode_id) AS count",
        ],
        orderBy: "thesaurus_terms.term",
        groupBy: "thesaurus_terms.term_id",
      },
    ];

    const fieldOptionsPromises = fields.map((field) =>
      executeQueryAsync(field, filters),
    );
    const fieldOptions = await Promise.all(fieldOptionsPromises);

    const browseOptions: BrowseOptions = {
      years: [],
      titles: [],
      authors: [],
      characters: [],
      terms: [],
    };
    fields.forEach((field, index) => {
      if (field.name === "terms") {
        browseOptions.terms = fieldOptions[index] as TermOption[];
      } else {
        browseOptions[field.name] = fieldOptions[index] as Option[];
      }
    });
    return browseOptions;
  },

  async searchEpisodes(
    query: Filters & { search?: string; page?: number },
  ): Promise<PaginatedResultsType<EpisodeEntity>> {
    const pageSize = 20;
    const page = query.page || 1;
    const offset = (page - 1) * pageSize;

    const whereConditions = [];
    const bindings = [];

    if (query.year) {
      whereConditions.push(`strftime('%Y', metadata_main.date) = ?`);
      bindings.push(query.year.toString());
    }
    if (query.title) {
      whereConditions.push(`metadata_titles.title_id = ?`);
      bindings.push(query.title.toString());
    }
    if (query.author) {
      whereConditions.push(`metadata_authors.author_id = ?`);
      bindings.push(query.author.toString());
    }
    if (query.character) {
      whereConditions.push(`metadata_characters.character_id = ?`);
      bindings.push(query.character.toString());
    }
    if (query.term) {
      whereConditions.push(`thesaurus_terms.term_id = ?`);
      bindings.push(query.term.toString());
    }
    if (query.search) {
      whereConditions.push(`(
        metadata_main.transcript LIKE ? OR
        metadata_titles.title LIKE ? OR
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) LIKE ? OR
        thesaurus_terms.term LIKE ? OR
        metadata_characters.character LIKE ?
      )`);
      const searchPattern = `%${query.search}%`;
      bindings.push(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
      );
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    const countStatement = db.prepare(`
      SELECT COUNT(DISTINCT metadata_main.episode_id) as total
      FROM metadata_main ${getMetadataJoins()}
      ${whereClause}
    `);

    countStatement.bind(bindings);
    countStatement.step();
    const totalCount = countStatement.getAsObject().total as number;
    countStatement.free();

    const statement = db.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${getMetadataJoins()}
      ${whereClause}
      ORDER BY metadata_main.date ASC, metadata_main.episode_id DESC
      LIMIT ? OFFSET ?
    `);

    statement.bind([...bindings, pageSize, offset]);

    const results: EpisodeEntity[] = [];
    while (statement.step()) {
      const row = statement.getAsObject();
      results.push({
        episode_id: row.episode_id as number,
        title_id: row.title_id as number,
        title: row.title as string,
        author_id: row.author_id as number,
        author: row.author as string,
        suffix: row.suffix as string,
        date: new Date(row.date as string),
        episode_title: row.episode_title as string,
        transcript: row.transcript as string,
        summary: row.summary as string,
        notes: row.notes as string,
      });
    }

    statement.free();

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      results,
      totalCount,
      totalPages,
      currentPage: page,
    };
  },

  async getEpisodeById(id) {
    const statement = db.prepare(`
      SELECT DISTINCT
        metadata_main.episode_id,
        metadata_main.title_id,
        metadata_titles.title,
        metadata_authors.author_id,
        (metadata_authors.first_name || ' ' || metadata_authors.last_name) AS author,
        metadata_main.suffix,
        metadata_main.date,
        metadata_main.episode_title,
        metadata_main.transcript,
        metadata_main.summary,
        metadata_main.notes,
        metadata_titles.title
      FROM metadata_main ${getMetadataJoins()}
      WHERE metadata_main.episode_id = ?
      LIMIT 1
    `);

    statement.bind([id]);
    statement.step();
    const row = statement.getAsObject();
    statement.free();

    if (!row.episode_id) {
      return false;
    }

    const charactersStatement = db.prepare(`
      SELECT
        metadata_characters.character_id,
        metadata_characters.character
      FROM metadata_characters
      JOIN metadata_character_map
        ON metadata_character_map.character_id = metadata_characters.character_id
      WHERE metadata_character_map.episode_id = ?
      ORDER BY metadata_characters.character ASC
    `);
    charactersStatement.bind([id]);
    const characters = [];
    while (charactersStatement.step()) {
      const charRow = charactersStatement.getAsObject();
      characters.push({
        character_id: charRow.character_id as number,
        name: charRow.character as string,
      });
    }
    charactersStatement.free();

    const termsStatement = db.prepare(`
      SELECT
        thesaurus_terms.term_id,
        thesaurus_terms.term
      FROM thesaurus_terms
      JOIN metadata_term_map
        ON metadata_term_map.term_id = thesaurus_terms.term_id
      WHERE metadata_term_map.episode_id = ?
    `);
    termsStatement.bind([id]);
    const terms: EpisodeTerms = [];
    while (termsStatement.step()) {
      const termRow = termsStatement.getAsObject();
      terms.push({
        term_id: termRow.term_id as number,
        term: termRow.term as string,
        is_preferred: true,
        usageCount: 0, // Placeholder
      });
    }

    const termUsageCounts = thesaurusClient.getUsageCount(
      terms.map((t) => t.term_id),
    );
    terms.forEach((term) => {
      term.usageCount = termUsageCounts[term.term_id] || 0;
    });

    return {
      episode_id: row.episode_id as number,
      title_id: row.title_id as number,
      title: row.title as string,
      author_id: row.author_id as number,
      author: row.author as string,
      suffix: row.suffix as string,
      date: new Date(row.date as string),
      episode_title: row.episode_title as string,
      transcript: row.transcript as string,
      summary: row.summary as string,
      notes: row.notes as string,
      characters,
      terms,
    };
  },

  async getNextAndPreviousEpisodeIds(
    episode: EpisodeEntity,
  ): Promise<{ next: string | null; previous: string | null }> {
    const nextStatement = db.prepare(`
      SELECT metadata_main.episode_id
      FROM metadata_main
      WHERE (metadata_main.date > ? OR (metadata_main.date = ? AND metadata_main.suffix > ?))
      AND metadata_main.title_id = ?
      AND metadata_main.episode_id != ?
      ORDER BY metadata_main.date ASC, metadata_main.suffix ASC
      LIMIT 1
    `);

    const episodeDateStr = episode.date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    nextStatement.bind([
      episodeDateStr,
      episodeDateStr,
      episode.suffix,
      episode.title_id,
      episode.episode_id,
    ]);
    nextStatement.step();
    const nextRow = nextStatement.getAsObject();
    nextStatement.free();

    const previousStatement = db.prepare(`
      SELECT metadata_main.episode_id
      FROM metadata_main
      WHERE (metadata_main.date < ? OR (metadata_main.date = ? AND metadata_main.suffix < ?))
      AND metadata_main.title_id = ?
      AND metadata_main.episode_id != ?
      ORDER BY metadata_main.date DESC, metadata_main.suffix DESC
      LIMIT 1
    `);

    previousStatement.bind([
      episodeDateStr,
      episodeDateStr,
      episode.suffix,
      episode.title_id,
      episode.episode_id,
    ]);
    previousStatement.step();
    const previousRow = previousStatement.getAsObject();
    previousStatement.free();

    return {
      next: nextRow.episode_id ? String(nextRow.episode_id) : null,
      previous: previousRow.episode_id ? String(previousRow.episode_id) : null,
    };
  },
};
