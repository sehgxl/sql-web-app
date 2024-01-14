/* eslint-disable react/prop-types */
import { Select, Input, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import useKeyPress from "../custom-hooks/useKeyPress";
const InputQuery = ({
  url,
  setMenuTabs,
  setURL,
  queryOptions,
  setQueryOptions,
  setProductCount,
  productCount,
  setIsSelectOpen,
  isSelectOpen,
}) => {
  const [customQueryInput, setCustomQueryInput] = useState("");

  const inputRef = useRef(null);

  useKeyPress((event) => {
    if (event.key === "Dead") {
      setIsSelectOpen((prev) => !prev);
    }
  });
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSelectChange = (value) => {
    setURL(value);
    setMenuTabs((prev) => {
      if (prev.find((item) => item.key === value)) {
        return prev;
      } else {
        return [...prev, { label: `New Tab ${prev.length}`, key: value }];
      }
    });
  };

  const handleCustomQueryInput = (event) => {
    setCustomQueryInput(event.target.value);
  };

  const addCustomQuery = (e) => {
    e.preventDefault();

    setCustomQueryInput("");
    setQueryOptions((prev) => [
      ...prev,
      {
        value: `https://dummyjson.com/products?&limit=10&skip=${productCount}`,
        label: customQueryInput,
      },
    ]);

    setProductCount((prev) => prev + 10);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      disabled={!isSelectOpen}
      style={{
        width: "100%",
        height: !isSelectOpen ? "0" : "max-content",
        opacity: !isSelectOpen ? "0" : "1",
        transition: "all .2s",
        visibility: !isSelectOpen ? "hidden" : "visible",
      }}
      value={url}
      options={queryOptions}
      size="large"
      showSearch
      placeholder="Search your query"
      optionFilterProp="children"
      filterOption={filterOption}
      onSelect={onSelectChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <div
            style={{
              padding: "0 8px 4px",
              width: "100%",
              display: "flex",
            }}
          >
            <Input
              style={{
                width: "100%",
                flexGrow: "1",
              }}
              placeholder="Enter a custom query"
              ref={inputRef}
              value={customQueryInput}
              onChange={handleCustomQueryInput}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") {
                  addCustomQuery(e);
                }
              }}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={addCustomQuery}
            >
              Add item
            </Button>
          </div>
        </>
      )}
    />
  );
};

export default InputQuery;
