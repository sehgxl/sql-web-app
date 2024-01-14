/* eslint-disable react/prop-types */
import { Table, Menu, notification, Tag, Button, Popover } from "antd";
import { capitalize } from "lodash";
import { useQuery } from "react-query";
import ErrorCard from "./ErrorCard";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { createContext, useRef } from "react";
import { unparse } from "papaparse";
import useKeyPress from "../custom-hooks/useKeyPress";
const defaultColumns = ["ID", "Price", "Title", "Brand", "Stock"];

const NotifContext = createContext({
  name: "Default",
});

const DataTable = ({ url, menuTabs, setURL, isSelectOpen }) => {
  const downloadBtnRef = useRef();

  const keyPressDownload = (event) => {
    if (event.key === "ð") {
      event.preventDefault();
      downloadBtnRef.current.click();
    }
  };
  useKeyPress(keyPressDownload);

  const addKeyToData = (data) => {
    return data?.map((item) => ({
      key: item.id,
      ...item,
    }));
  };

  const [notifAPI, notifContextHolder] = notification.useNotification({
    stack: {
      threshold: 1,
    },
  });

  const openNotification = (text) => {
    text
      ? notifAPI.success({
          message: `ID  ${text} copied to your clipboard.`,
          placement: "bottomLeft",
          duration: 1.5,
        })
      : notifAPI.error({
          message: `Could not copy id, something went wrong.`,
          placement: "bottomLeft",
          duration: 4,
        });
  };

  const pasteInClipboard = (e) => {
    const id = e.target.parentElement.nextSibling.innerText;
    navigator.clipboard.writeText(id);
    openNotification(id);
  };

  const getColumns = (data) => {
    let columns = "Action";

    const fetchedColumns = data?.products[0]
      ? Object.keys(data?.products[0])
      : defaultColumns;

    columns = [columns, ...fetchedColumns];

    return columns?.map((item, index) => {
      if (index === 0) {
        return {
          title: capitalize(item),
          dataIndex: item,
          key: item,
          render: () => (
            <div
              className="w-[6ch] hover:cursor-pointer hover:scale-150 hover:rotate-12 pl-5 delay-[50] transition ease-linear"
              onClick={(e) => pasteInClipboard(e)}
            >
              <CopyOutlined className="scale-125 pointer-events-none" />
            </div>
          ),
          fixed: "left",
        };
      }
      if (index === 1) {
        return {
          title: capitalize(item),
          dataIndex: item,
          key: item,
          render: (text) => <Tag color="blue">{text}</Tag>,
          fixed: "left",
        };
      } else
        return {
          title: capitalize(item),
          dataIndex: item,
          key: item,
          render: (text) => <div className="min-w-[12ch]">{text}</div>,
        };
    });
  };

  const onTabClick = (e) => {
    setURL(e.key);
  };

  const fetchData = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  };

  const { isLoading, isError, data, error } = useQuery(
    ["Data", url],
    fetchData
  );

  if (isError) {
    return <ErrorCard error={error} />;
  }

  const csvFormat = data?.products && unparse(data.products);
  const blob = new Blob(["\ufeff", csvFormat]);
  const downloadURL = URL.createObjectURL(blob);

  return (
    <NotifContext.Provider>
      {notifContextHolder}
      <Table
        title={() => (
          <div className="flex items-center">
            <Menu
              className="flex-grow"
              onClick={onTabClick}
              selectedKeys={[url]}
              mode="horizontal"
              items={menuTabs}
            />
            <Popover
              placement="bottomRight"
              content={() => <div>{`\u2325 + d`}</div>}
            >
              <Button
                disabled={isLoading}
                ref={downloadBtnRef}
                icon={<DownloadOutlined />}
                className="flex-grow-0"
                download={"Data.csv"}
                href={downloadURL}
              >
                Download as CSV
              </Button>
            </Popover>
          </div>
        )}
        scroll={{ x: true, y: isSelectOpen ? "65vh" : "70vh" }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        loading={isLoading}
        columns={getColumns(data)}
        dataSource={addKeyToData(data?.products)}
      />
    </NotifContext.Provider>
  );
};

export default DataTable;
