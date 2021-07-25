import React, { useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";

const App = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState("select 'hello world'");

  useEffect(() => {
    (async () => {
      const Sql = await initSqlJs({
        locateFile: () => `/sql-wasm.wasm`,
      });
      setDb(new Sql.Database());
    })();
  }, []);

  return (
    <>
      <h1>Welcome to sqlzero!</h1>
      <textarea
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
      <button onClick={() => alert(db?.exec(query)[0].values)}>
        Execute query
      </button>
    </>
  );
};

export default App;
