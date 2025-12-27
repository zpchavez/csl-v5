import type SQL from "sql.js";
import { db } from "src/lib/db";
import type {
  NonPreferredTerm,
  NonPreferredTermDetails,
  PreferredTerm,
  PreferredTermDetails,
} from "src/modules/comics/domain/TermEntity";

export const thesaurusClient = {
  getUsageCount(termId: number) {
    // Get count of the term itself, plus all narrower (child) terms,
    // including grand-child, great-grand-child, etc.
    const sql = `
      WITH RECURSIVE term_tree AS (
        SELECT term_id
        FROM thesaurus_terms
        WHERE term_id = ?
        UNION ALL
        SELECT tt.term_id
        FROM thesaurus_terms tt
        JOIN thesaurus_relationships tr
        ON tt.term_id = tr.related_id
        JOIN term_tree ttree
        ON tr.term_id = ttree.term_id
        WHERE tr.type = 'NT'
      )
      SELECT COUNT(DISTINCT mtm.episode_id) AS usageCount
      FROM metadata_term_map mtm
      JOIN term_tree tt
      ON mtm.term_id = tt.term_id
    `;
    const statement = db.prepare(sql);
    statement.bind([termId]);
    statement.step();
    const row = statement.getAsObject();
    statement.free();
    return row.usageCount as number;
  },

  async getTermDetails(termId: number) {
    const usageCountSQL = `(
          SELECT COUNT(*)
          FROM metadata_term_map
          WHERE metadata_term_map.term_id = thesaurus_terms.term_id
        ) AS usageCount
    `;

    const getRelatedTermsStatement = (
      termId: number,
      type: "BT" | "NT" | "RT" | "UF" | "USE",
    ) => {
      const sql = `
        SELECT
          thesaurus_terms.term_id,
          thesaurus_terms.term
          ${type === "UF" ? "" : `,${usageCountSQL}`}
        FROM thesaurus_terms
        JOIN thesaurus_relationships
        ON thesaurus_terms.term_id = thesaurus_relationships.related_id
        WHERE type = ?
        AND thesaurus_relationships.term_id = ?
      `;
      const bindings = [type, termId];
      const statement = db.prepare(sql);
      statement.bind(bindings);
      return statement;
    };

    const getPreferredTermsFromStatement = (
      statement: SQL.Statement,
    ): PreferredTerm[] => {
      const terms: PreferredTerm[] = [];
      while (statement.step()) {
        const termRow = statement.getAsObject();
        terms.push({
          term_id: termRow.term_id as number,
          term: termRow.term as string,
          is_preferred: true,
          usageCount: termRow.usageCount as number,
        });
      }
      return terms;
    };

    const getNonPreferredTermsFromStatement = (
      statement: SQL.Statement,
    ): NonPreferredTerm[] => {
      const terms: NonPreferredTerm[] = [];
      while (statement.step()) {
        const termRow = statement.getAsObject();
        terms.push({
          term_id: termRow.term_id as number,
          term: termRow.term as string,
          is_preferred: false,
        });
      }
      return terms;
    };

    const termStatement = db.prepare(`
      SELECT
        term_id,
        term,
        is_preferred,
        ${usageCountSQL}
      FROM thesaurus_terms
      WHERE term_id = ?
      LIMIT 1
    `);

    termStatement.bind([termId]);
    termStatement.step();
    const termRow = termStatement.getAsObject();
    termStatement.free();

    if (!termRow.term_id) {
      return false;
    }

    if (termRow.is_preferred) {
      const term: PreferredTerm = {
        term_id: termRow.term_id as number,
        term: termRow.term as string,
        is_preferred: true,
        usageCount: termRow.usageCount as number,
      };

      const broaderTermsStatement = getRelatedTermsStatement(termId, "BT");
      const narrowerTermsStatement = getRelatedTermsStatement(termId, "NT");
      const relatedTermsStatement = getRelatedTermsStatement(termId, "RT");
      const usedForTermsStatement = getRelatedTermsStatement(termId, "UF");

      const termDetails: PreferredTermDetails = {
        term,
        broader_terms: getPreferredTermsFromStatement(broaderTermsStatement),
        narrower_terms: getPreferredTermsFromStatement(narrowerTermsStatement),
        related_terms: getPreferredTermsFromStatement(relatedTermsStatement),
        used_for_terms: getNonPreferredTermsFromStatement(
          usedForTermsStatement,
        ),
      };

      return termDetails;
    } else {
      const term: NonPreferredTerm = {
        term_id: termRow.term_id as number,
        term: termRow.term as string,
        is_preferred: false,
      };

      const useTermsStatement = getRelatedTermsStatement(termId, "USE");
      const useTerms = getPreferredTermsFromStatement(useTermsStatement);

      const termDetails: NonPreferredTermDetails = {
        term,
        use_terms: useTerms,
      };
      return termDetails;
    }
  },
};
