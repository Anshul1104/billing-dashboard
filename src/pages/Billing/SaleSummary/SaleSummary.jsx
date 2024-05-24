import { Flex } from "antd";
import styles from "./saleSummary.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const SaleSummary = () => {
  const {
    finalProducts,
    selectedPaymentMethod,
    selectedCustomer,
    selectedSalesPerson,
  } = useContext(GlobalContext);
  const tax = finalProducts.length > 0 ? 10 : 0;

  const calculateTotalAmount = () => {
    return finalProducts.reduce((total, product) => {
      const price = product.selling_price || product.price;
      return total + price * product.quantity;
    }, 0);
  };
  const calculateTotalQuantity = () => {
    return finalProducts.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  return (
    <div className={styles.container}>
      <Flex vertical gap={20} className={styles["sale-summary"]}>
          {selectedCustomer ? (
            <div>
              <h3>Customer Info</h3>
              <Flex>
                <p>
                  {selectedCustomer?.name} | {selectedCustomer?.phone}
                </p>
              </Flex>
            </div>
          ) : null}
          {selectedSalesPerson && (
            <div style={{ marginBottom: 60 }}>
              <h3>Salesperson</h3>
              <Flex>
                <p>{selectedSalesPerson?.name}</p>
              </Flex>
            </div>
          )}
        <h3>SALES SUMMARY</h3>
        <Flex justify='space-between' className='sub-total'>
          <h4>Sub Total</h4>
          <p>${calculateTotalAmount()}</p>
        </Flex>
        <Flex justify='space-between' className='tax'>
          <h4>Tax</h4>
          <p>{tax}</p>
        </Flex>
        <Flex justify='space-between' className={styles.total}>
          <h4>
            <strong>
              Total(Items: {finalProducts.length}, Quantity:{" "}
              {calculateTotalQuantity()})
            </strong>
          </h4>
          <p>
            <strong>${calculateTotalAmount() + tax}</strong>
          </p>
        </Flex>
        {selectedPaymentMethod && (
          <Flex justify='space-between' className={styles["payment-method"]}>
            <h4>Selected Payment Method</h4>
            <p>{selectedPaymentMethod}</p>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default SaleSummary;
