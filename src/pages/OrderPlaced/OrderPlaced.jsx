import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { CheckCircleTwoTone } from "@ant-design/icons";
import styles from "./orderPlaced.module.css";
import { Button, Card, Col, Flex, Row } from "antd";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const { createOrder } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <Row justify='center' style={{ textAlign: "center" }}>
        <Col span={5}>
          <Card className={styles.card}>
            <CheckCircleTwoTone
              twoToneColor='#52c41a'
              className={styles.icon}
            />
            <h3>Order has been placed successfully</h3>
          </Card>
          <Flex vertical gap={20} className={styles["order-details"]}>
            <h4>
              <strong>Order ID:</strong> {createOrder.id}
              
            </h4>
            <h4>
              <strong>Transaction ID:</strong> {createOrder.transaction_id}
              
            </h4>
            <h4 style={{textTransform: 'capitalize'}}>
              <strong>Payment Mode: </strong>
              {createOrder.payment_mode} 
            </h4>
            <Button
              size='large'
              type='primary'
              onClick={() => navigate("/orders")}
            >
              View Order
            </Button>
          </Flex>
        </Col>
      </Row>
    </section>
  );
};

export default OrderPlaced;
