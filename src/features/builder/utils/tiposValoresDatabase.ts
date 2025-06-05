export const TIPOS_VALORES_DATABASE = {
  /* ────────────────  Storage classes nativos  ──────────────── */
  integer: "INTEGER",
  real: "REAL",
  text: "TEXT",
  blob: "BLOB",
  numeric: "NUMERIC", // afinidad mixta (“catch-all”)
  null: "NULL",

  /* ────────────────  Alias que se normalizan a INTEGER  ────── */
  int: "INTEGER",
  tinyint: "INTEGER",
  smallint: "INTEGER",
  mediumint: "INTEGER",
  bigint: "INTEGER",
  unsigned_big_int: "INTEGER",
  int2: "INTEGER",
  int8: "INTEGER",

  /* ────────────────  Alias que se normalizan a TEXT  ───────── */
  character: "TEXT",
  varchar: "TEXT",
  varying_character: "TEXT",
  nchar: "TEXT",
  native_character: "TEXT",
  nvarchar: "TEXT",
  clob: "TEXT",

  /* ────────────────  Alias que se normalizan a REAL  ───────── */
  double: "REAL",
  double_precision: "REAL",
  float: "REAL",

  /* ────────────────  Alias que se normalizan a NUMERIC ─────── */
  decimal: "NUMERIC",
  boolean: "NUMERIC",
  date: "NUMERIC",
  time: "NUMERIC",
  datetime: "NUMERIC",
  timestamp: "NUMERIC",
} as const;
export const TIPOS_VALORES_ARRAY = Object.entries(TIPOS_VALORES_DATABASE).map(
  ([label, value]) => ({ label, value })
);

export const TIPOS_CARDINALIDAD = {
  ONE_TO_ONE: "one-to-one",
  ONE_TO_MANY: "one-to-many", 
  MANY_TO_ONE: "many-to-one",
  MANY_TO_MANY: "many-to-many"
} as const;