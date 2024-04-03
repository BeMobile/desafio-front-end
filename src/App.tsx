import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { TableRowDesktop } from "./components/TableRowDesktop";
import { TableRowMobile } from "./components/TableRowMobile";
import { Employee } from "./types/employee";
import { filterEmployees } from "./utils/filterEmployees";
import { getEmployees } from "./utils/fetchData";
import { TableDesktop } from "./components/TableDesktop";
import { TableMobile } from "./components/TableMobile";
import { Loading } from "./components/Loading";
import { SearchInput } from "./components/SearchInput";

function App() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let ignore = false;
    setEmployees(null);
    getEmployees().then((result) => {
      if (!ignore) {
        setEmployees(result);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <div className="search-and-title-container">
            <h1 className="h1">Funcionários</h1>

            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!employees ? (
            <Loading />
          ) : (
            <>
              <TableMobile>
                {employees
                  .filter((e) => filterEmployees(e, search))
                  .map((e) => {
                    return <TableRowMobile key={e.id} employee={e} />;
                  })}
              </TableMobile>

              <TableDesktop>
                {employees
                  .filter((e) => filterEmployees(e, search))
                  .map((e) => {
                    return <TableRowDesktop key={e.id} employee={e} />;
                  })}
              </TableDesktop>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
