import { db } from "src/lib/db";
import type {
  BrowseOptions,
  MetadataClientInterface,
  Option,
} from "src/modules/comics/domain/MetadataClientInterface";
import { getMetadataJoins } from "src/modules/comics/infra/sqlHelper";

type Wheres = {
  year?: string;
  title?: string;
  author?: string;
  character?: string;
  term?: string;
};
type ExcludeWhere = "years" | "titles" | "authors" | "characters" | "terms";

const getWheresAndBindings = (
  wheres: Wheres,
  exclude: ExcludeWhere | null,
): [string, string[]] => {
  const whereStrings = [];
  const bindings = [];
  if (wheres.year && exclude !== "years") {
    whereStrings.push(`strftime('%Y', date) = ?`);
    bindings.push(wheres.year);
  }
  if (wheres.title && exclude !== "titles") {
    whereStrings.push(`metadata_titles.title_id = ?`);
    bindings.push(wheres.title);
  }
  if (wheres.author && exclude !== "authors") {
    whereStrings.push(`metadata_authors.author_id = ?`);
    bindings.push(wheres.author);
  }
  if (wheres.character && exclude !== "characters") {
    whereStrings.push(`metadata_characters.character_id = ?`);
    bindings.push(wheres.character);
  }
  if (wheres.term && exclude !== "terms") {
    whereStrings.push(`thesaurus_terms.term_id = ?`);
    bindings.push(wheres.term);
  }
  return [whereStrings.length ? whereStrings.join(" AND ") : "true", bindings];
};

export const metadataClient: MetadataClientInterface = {
  async fetchBrowseOptions() {
    const wheres: Wheres = {};

    const fields: {
      name: ExcludeWhere;
      idCol: string | null;
      select: string[];
      orderBy: string;
    }[] = [
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
        ],
        orderBy: "thesaurus_terms.term",
      },
    ];

    return Promise.all(
      fields.map((field) => {
        const [wheresSql, bindings] = getWheresAndBindings(wheres, field.name);

        const statement = db.prepare(
          `SELECT DISTINCT ${field.select.join(", ")}
          FROM metadata_main ${getMetadataJoins()}
          WHERE ${wheresSql}
          ${field.idCol ? ` AND ${field.idCol} IS NOT NULL ` : ""}
          ORDER BY ${field.orderBy}`,
        );

        statement.bind(bindings);

        const options: Option[] = [];

        while (statement.step()) {
          const row = statement.getAsObject();
          if (row.value && row.label) {
            options.push({
              label: row.label as string,
              value: row.value as string,
            });
          }
        }

        statement.free();

        return options;
      }),
    ).then((results) => {
      const browseOptions: BrowseOptions = {
        years: [],
        titles: [],
        authors: [],
        characters: [],
        terms: [],
      };
      fields.forEach((field, index) => {
        browseOptions[field.name] = results[index] as Option[];
      });
      return browseOptions;
    });
  },
};
