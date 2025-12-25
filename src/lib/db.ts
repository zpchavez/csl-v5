import initSqlJs from "sql.js";
import { config } from "src/config";

const SQL = await initSqlJs({
  locateFile: (file) => `${config.host}/${file}`,
});

const response = await fetch(`${config.host}/database.db`);
const dbData = new Uint8Array(await response.arrayBuffer());

export const db = new SQL.Database(dbData);

// Database related @TODOs:
// - Find episodes with non-preferred terms assigned and fix it.
// - Remove views if I didn't end up needing them.
