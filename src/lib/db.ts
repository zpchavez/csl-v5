import initSqlJs from "sql.js";

const SQL = await initSqlJs({
  locateFile: (file) => `${window.location.origin}/${file}`,
});

const response = await fetch(`${window.location.origin}/database.db`);
const dbData = new Uint8Array(await response.arrayBuffer());

export const db = new SQL.Database(dbData);
