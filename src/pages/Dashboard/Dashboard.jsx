import { Button, Card, Col, Flex, Row } from "antd";
import styles from "./dashboard.module.css";
import {
  ShoppingOutlined,
  HeartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={24}>
        <Col span={6}>
          <Card bordered={false} className={styles.card} size='small'>
            <Flex gap={16} align='center'>
              <span className={styles.icon}>$</span>
              <div className={styles.heading}>Monthly Sales</div>
            </Flex>
            <div className={styles.title}>
              <sup>$</sup>30000
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.card} size='small'>
            <Flex gap={16} align='center'>
              <span className={styles.icon}>
                <ShoppingOutlined />
              </span>
              <div className={styles.heading}>Today&apos;s Sales</div>
            </Flex>
            <div className={styles.title}>
              <sup>$</sup>4000
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.card} size='small'>
            <Flex gap={16} align='center'>
              <span className={styles.icon}>
                <HeartOutlined />
              </span>
              <div className={styles.heading}>New Customers</div>
            </Flex>
            <div className={styles.title}>20</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.card} size='small'>
            <Flex gap={16} align='center'>
              <span className={styles.icon}>
                <WarningOutlined />
              </span>
              <div className={styles.heading}>Low Stock Items</div>
            </Flex>
            <div className={styles.title}>5</div>
          </Card>
        </Col>
      </Row>
      <h2 style={{ paddingTop: 40 }}>Quick Actions</h2>
      <Row className={styles["quick-action"]}>
        <Flex gap={30} wrap>
          <Card className={styles.card}>
            <div className={styles.title}>
              Efficiently scan new products into the system.
            </div>
            <Button size='large' type='primary'>
              Scan Product
            </Button>
          </Card>
          <Card className={styles.card}>
            <div className={styles.title}>
              Easily create and manage customer orders.
            </div>
            <Button size='large' type='primary'>
              <NavLink to='/orders/create'>Create Order</NavLink>
            </Button>
          </Card>
          <Card className={styles.card}>
            <div className={styles.title}>
              View detailed information about all your customers.
            </div>
            <Button size='large' type='primary'>
              <NavLink to='/customers'>See Customers</NavLink>
            </Button>
          </Card>
          <Card className={styles.card}>
            <div className={styles.title}>
              Quickly add products in your inventory.
            </div>
            <Button size='large' type='primary'>
              <NavLink to='/products'>Update Inventory</NavLink>
            </Button>
          </Card>
        </Flex>
      </Row>
    </div>
  );
};

export default Dashboard;
