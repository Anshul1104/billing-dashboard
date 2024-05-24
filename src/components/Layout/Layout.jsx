import { useContext, useEffect, useState } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Orders from "../../pages/Orders/Orders";
import Products from "../../pages/Products/Products";
import Customers from "../../pages/Customers/Customers";
import styles from "./layout.module.css";
import Header from "../Header/Header";
import CreateOrder from "../../pages/Billing/CreateOrder";
import Login from "../../pages/Login/Login";
import { AuthContext } from "../../context/AuthContext";
import OrderPlaced from "../../pages/OrderPlaced/OrderPlaced";

const { Sider, Content } = Layout;
const MainSide = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { setAuthenticated } = useContext(AuthContext);
  const authenticated = JSON.parse(localStorage.getItem("isAuth"));
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    setSelectedKey(path);
  }, []);

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  
  return (
    <Layout hasSider>
      {authenticated && (
        <>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={230}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div className={styles.logo} />
            <Menu
              onClick={({ key }) => {
                if (key === "logout") {
                  setAuthenticated(false);
                  localStorage.setItem("isAuth", false);
                  navigate("/");
                } else {
                  setSelectedKey(key);
                  navigate(key);
                }
              }}
              theme='dark'
              mode='inline'
              selectedKeys={[selectedKey]}
              defaultSelectedKeys={["/dashboard"]}
              items={[
                {
                  key: "/dashboard",
                  icon: <DashboardOutlined />,
                  label: "Dashboard",
                },
                {
                  key: "/orders",
                  icon: <ShoppingOutlined />,
                  label: "Orders",
                },
                {
                  key: "/products",
                  icon: <UnorderedListOutlined />,
                  label: "Products",
                },
                {
                  key: "/customers",
                  icon: <UserOutlined />,
                  label: "Customers",
                },
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                },
              ]}
            />
          </Sider>
          <Layout
            style={{
              marginLeft: collapsed ? 100 : 230,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
              collapsed={collapsed}
              toggle={toggle}
            ></Header>
            <Content
              style={{
                padding: 30,
                minHeight: 280,
                background: "#fff",
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/create' element={<CreateOrder />} />
                <Route path='/products' element={<Products />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/order-successful' element={<OrderPlaced />} />
              </Routes>
            </Content>
          </Layout>
        </>
      )}
      {!authenticated && <Login />}
    </Layout>
  );
};
export default MainSide;
