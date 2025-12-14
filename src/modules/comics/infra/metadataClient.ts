import { db } from "src/lib/db";
import type {
  BrowseOptions,
  Filters,
  MetadataClientInterface,
  Option,
  TermOption,
} from "src/modules/comics/domain/MetadataClientInterface";
import { getMetadataJoins } from "src/modules/comics/infra/sqlHelper";

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
    bindings.push(filters.year);
  }
  if (filters.title && exclude !== "titles") {
    whereStrings.push(`metadata_titles.title_id = ?`);
    bindings.push(filters.title);
  }
  if (filters.author && exclude !== "authors") {
    whereStrings.push(`metadata_authors.author_id = ?`);
    bindings.push(filters.author);
  }
  if (filters.character && exclude !== "characters") {
    whereStrings.push(`metadata_characters.character_id = ?`);
    bindings.push(filters.character);
  }
  if (filters.term && exclude !== "terms") {
    whereStrings.push(`thesaurus_terms.term_id = ?`);
    bindings.push(filters.term);
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
  async fetchBrowseOptions(filters: Filters) {
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
};
