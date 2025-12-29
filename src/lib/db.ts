import initSqlJs from "sql.js";

const SQL = await initSqlJs({
  locateFile: (file) =>
    `${window.location.origin}${import.meta.env.VITE_BASE_PATH}${file}`,
});

const response = await fetch(
  `${window.location.origin}${import.meta.env.VITE_BASE_PATH}database.db`,
);
const dbData = new Uint8Array(await response.arrayBuffer());

export const db = new SQL.Database(dbData);
