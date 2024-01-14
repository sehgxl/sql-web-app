/* eslint-disable react/prop-types */
import { Table, Menu } from "antd";
import { capitalize } from "lodash";
import { useQuery } from "react-query";
import ErrorCard from "./ErrorCard";
import { CopyOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { createContext } from "react";

const defaultColumns = ["ID", "Price", "Title", "Brand", "Stock"];

const NotifContext = createContext({
  name: "Default",
});

const DataTable = ({ url, menuTabs, setURL }) => {
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
    console.log(id);
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
              className=" w-[6ch] hover:cursor-pointer hover:scale-150 hover:rotate-12 pl-5 delay-[50] transition ease-linear"
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
          render: (text) => <div className="w-[6ch]">{text}</div>,
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

  return (
    <NotifContext.Provider>
      {notifContextHolder}
      <Table
        title={() => (
          <Menu
            onClick={onTabClick}
            selectedKeys={[url]}
            mode="horizontal"
            items={menuTabs}
          />
        )}
        scroll={{ x: true, y: "60vh" }}
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
