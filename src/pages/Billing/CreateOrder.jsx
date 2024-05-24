import { Button, Steps, message } from "antd";
import { useContext, useState } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Choose Products",
    content: <Step1 />,
  },
  {
    title: "Choose Customer",
    content: <Step2 />,
  },
  {
    title: "Choose Staff",
    content: <Step3 />,
  },
  {
    title: "Choose Payment Method",
    content: <Step4 />,
  },
  {
    title: "Review",
    content: <Step5 />,
  },
];

const CreateOrder = () => {
  const {
    finalProducts,
    setFinalProducts,
    setCreateOrder,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedCustomer,
    setSelectedCustomer,
    selectedSalesPerson,
    setSelectedSalesPerson,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: 50,
  };
  const onChange = (value) => {
    setCurrent(value);
  };

  const nextClickHandler = () => {
    switch (current) {
      case 0:
        if (finalProducts.length === 0) {
          message.error("Please select at least one product");
          return;
        }
        break;
      case 1:
        if (!selectedCustomer.id) {
          message.error("Please select a customer");
          return;
        }
        break;
      case 2:
        if (!selectedSalesPerson.id) {
          message.error("Please select a salesperson");
          return;
        }
        break;
      case 3:
        if (!selectedPaymentMethod) {
          message.error("Please select a payment method");
          return;
        }
        break;
      default:
        break;
    }
    // If all validations pass, move to the next step
    next();
  };

  const orderPlacedHandler = () => {
    const finalOrderReq = {
      id: crypto.randomUUID().slice(0, 8),
      customer_id: selectedCustomer.id,
      address_id: selectedCustomer?.addresses?.[0]?.id,
      staff_id: selectedSalesPerson.id,
      payment_status: "completed",
      transaction_id: crypto.randomUUID().slice(0, 10),
      payment_mode: selectedPaymentMethod,
      sale_staff_id: selectedSalesPerson.id,
      items: finalProducts.map((product) => {
        return {
          id: product.id,
          product_id: product.id,
          size: product.sizes?.[0],
          color: product.color,
          selling_price: product.selling_price,
          stock_type: product.stock_type,
          billing_store_id: product.billing_store_id,
          fulfilment_store_id: product.fulfilment_store_id,
          remarks: product.remarks || "",
        };
      }),
    };
    setCreateOrder(finalOrderReq);
    navigate("/order-successful");
    setFinalProducts([]);
    setSelectedCustomer("");
    setSelectedPaymentMethod("");
    setSelectedSalesPerson("");
  };
  return (
    <>
      <Steps current={current} items={items} onChange={onChange} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <Button
            size='large'
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type='primary'
            size='large'
            onClick={() => nextClickHandler()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type='primary'
            size='large'
            onClick={() => {
              orderPlacedHandler();
            }}
          >
            Place Order
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateOrder;
