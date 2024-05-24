/* eslint-disable react/prop-types */
// import "antd/dist/antd.css";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  PushpinOutlined,
  PieChartOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

// import logo from '../../assets/img/react-logo.png';

const { Sider } = Layout;

const Sidebar = ({collapsed}) => {
  // const mediaQuery = window.matchMedia('(max-width: 991px)')

  // if(mediaQuery.matches) {
  //   this.setState({collapsed: true});
  // }
  // };

  return (
    <Sider
    breakpoint="md"
    collapsedWidth="60" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        {/* <img src={logo} alt="React Logo"/> */}
        </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <NavLink
            to="/"
            exact
          >
            DashBoard
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<PushpinOutlined />}>
          <NavLink
            to="/products"
            exact
          >
            Products
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <NavLink
            to="/customers"
            exact
          >
            Customers
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
