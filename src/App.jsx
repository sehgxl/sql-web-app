/* eslint-disable react/prop-types */
import { useState } from "react";
import DataTable from "../src/components/DataTable";
import InputQuery from "./components/InputQuery";

const MarginTopSpacer = () => {
  return <div className="mt-3"></div>;
};

const AppWrapper = ({ children }) => {
  return <section className="h-screen p-5 bg-slate-100">{children}</section>;
};

function App() {
  const getAllDataURL = "https://dummyjson.com/products?&limit=0";

  const [url, setURL] = useState(getAllDataURL);

  const [menuTabs, setMenuTabs] = useState([
    {
      label: "Original Data",
      key: getAllDataURL,
    },
  ]);

  const [queryOptions, setQueryOptions] = useState([
    {
      value: getAllDataURL,
      label: "SELECT * FROM api;",
    },
    {
      value:
        "https://dummyjson.com/products?&limit=20&skip=0&select=title,price",
      label: "SELECT id, price, title FROM api LIMIT 20;",
    },
    {
      value:
        "https://dummyjson.com/products/category/smartphones?&select=title,price,brand,price",
      label:
        "SELECT id, price, title, brand FROM api WHERE category = 'smartphones';",
    },
  ]);

  const [productCount, setProductCount] = useState(10);

  return (
    <AppWrapper>
      <InputQuery
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
        productCount={productCount}
        setProductCount={setProductCount}
        url={url}
        setURL={setURL}
        setMenuTabs={setMenuTabs}
      />
      <MarginTopSpacer />
      <DataTable url={url} setURL={setURL} menuTabs={menuTabs} />
    </AppWrapper>
  );
}

export default App;
