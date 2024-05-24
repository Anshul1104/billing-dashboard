/* eslint-disable react/prop-types */
import styles from "./header.module.css";

import {
  MenuUnfoldOutlined,
  HomeOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { storeInfo } from "../../mockData/storeInfo";

const Header = ({ collapsed, toggle, children }) => {
  const { Header } = Layout;
  return (
    <Header className={styles["site-layout-background"]}>
      <Button
        size='large'
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggle()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className={styles["inner-container"]}>
        <Flex justify='end' align='center' gap={16}>
          <p style={{ fontSize: 20, fontWeight: "bold" }}>Store</p>
          <div className={styles["store-name"]}>
            <HomeOutlined style={{ marginRight: 10 }} />{" "}
            <span> {storeInfo.name}</span>
          </div>
        </Flex>
      </div>

      {children}
    </Header>
  );
};

export default Header;
