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
        highlightActiveLine={true}
        maxLines={Infinity}
        showGutter={false}
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
    create table costs (
      month text,
      region text,
      amount real
    ) ;
    insert into costs values
      ('2020-10', 'North', -10345.7),
      ('2020-10', 'East', -10782.5),
      ('2020-10', 'West', -8995.6),
      ('2020-10', 'South', -9832.4),
      ('2020-11', 'North', -13567.2),
      ('2020-11', 'East', -11292.3),
      ('2020-11', 'West', -7943.5),
      ('2020-11', 'South', -14133.4) ;
    create table sales (
      month text,
      region text,
      product text,
      amount real
    ) ;
    insert into sales values
      ('2020-10',	'North', 'ProdA', 5782.5),
      ('2020-10',	'East', 'ProdA', 3393.2),
      ('2020-10',	'West', 'ProdA', 3289.2),
      ('2020-10',	'South', 'ProdA', 2387.1),
      ('2020-10',	'North', 'ProdB', 7492.5),
      ('2020-10',	'East', 'ProdB', 9482.2),
      ('2020-10',	'West', 'ProdB', 3463.5),
      ('2020-10',	'South', 'ProdB', 8713.6),
      ('2020-11',	'North', 'ProdA', 2782.2),
      ('2020-11',	'East', 'ProdA', 8538.2),
      ('2020-11',	'West', 'ProdA', 8253.2),
      ('2020-11',	'South', 'ProdA', 2887.1),
      ('2020-11',	'North', 'ProdB', 8279.8),
      ('2020-11',	'East', 'ProdB', 9778.2),
      ('2020-11',	'West', 'ProdB', 9882.8),
      ('2020-11',	'South', 'ProdB', 7978.1) ;
  `);
  return db;
};

export default App;
