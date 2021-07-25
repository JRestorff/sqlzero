import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import initSqlJs, { Database } from "sql.js";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

const App = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState(
    "select 'hello'\nunion all\nselect 'world'"
  );

  useEffect(() => {
    (async () => {
      setDb(await getDb());
    })();
  }, []);

  return (
    <>
      <h1>Welcome to sqlzero!</h1>
      <AceEditor
        value={query}
        mode="sql"
        theme="monokai"
        fontSize={16}
        showPrintMargin={true}
        highlightActiveLine={true}
        showGutter={false}
        height="5rem"
        onChange={(value) => setQuery(value)}
        setOptions={{
          showLineNumbers: false,
          tabSize: 4,
        }}
      />
      <button
        style={{ marginTop: "0.5rem" }}
        onClick={() => alert(db?.exec(query)[0].values)}
      >
        Execute query
      </button>
    </>
  );
};

const getDb = async () => {
  const Sql = await initSqlJs({
    locateFile: () => `/sql-wasm.wasm`,
  });
  const db = new Sql.Database();
  db.exec(`
    create table employees (
      name text,
      salary real
    ) ;
    insert into employees values
      ('John', 530),
      ('Thomas', 470),
      ('Matt', 760),
      ('Maria', 339),
      ('Anne', 467) ;
  `);
  return db;
};

export default App;
