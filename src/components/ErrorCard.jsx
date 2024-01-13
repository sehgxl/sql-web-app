/* eslint-disable react/prop-types */
import { WarningOutlined } from "@ant-design/icons";
import { Card } from "antd";

const ErrorCard = ({ error }) => {
  return (
    <Card
      style={{
        fontSize: "1rem",
      }}
    >
      <WarningOutlined /> Sorry we encountered an Error : {error?.message}
    </Card>
  );
};

export default ErrorCard;
