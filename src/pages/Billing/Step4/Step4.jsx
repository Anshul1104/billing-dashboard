import { Col, Row } from "antd";
import styles from "./step4.module.css";
import SaleSummary from "../SaleSummary/SaleSummary";
import { useContext } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { GlobalContext } from "../../../context/GlobalContext";

const Step4 = () => {
  const { selectedPaymentMethod, setSelectedPaymentMethod } =
    useContext(GlobalContext);

  return (
    <Row className={styles["step-4-section"]}>
      <Col span={16}>
        <div className={styles["select-payment-method"]}>
          <h3 style={{ marginBottom: "20px" }}>Select Payment Method</h3>
          <div className={styles["choose-payment-method"]}>
            <div
              className={`${styles.box} ${
                selectedPaymentMethod === "cash" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("cash")}
            >
              Cash
              <CheckCircleTwoTone
                twoToneColor='#00b894'
                className={styles.icon}
              />
            </div>
            <div
              className={`${styles.box} ${
                selectedPaymentMethod === "card" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("card")}
            >
              Card
              <CheckCircleTwoTone
                twoToneColor='#00b894'
                className={styles.icon}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div className='payment-container'>
          <SaleSummary />
        </div>
      </Col>
    </Row>
  );
};

export default Step4;
