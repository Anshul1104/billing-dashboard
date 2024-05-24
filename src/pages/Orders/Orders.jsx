import { Button, Flex, Input, Select } from "antd";
import { orders } from "../../mockData/orders";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./orders.module.css";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const [ordersData, setOrdersData] = useState(orders);
  const [searchOrder, setSearchOrder] = useState("");
  const [selectRow, setSelectRow] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");

  const applyFilters = useCallback(() => {
    let filteredOrders = orders;
    if (paymentMethod !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.payment_mode.toLowerCase() === paymentMethod
      );
    }
    if (paymentStatus !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.payment_status.toLowerCase() === paymentStatus
      );
    }
    if (searchOrder) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toString().includes(searchOrder) ||
          order.transaction_id
            .toLowerCase()
            .includes(searchOrder.toLowerCase()) ||
          order.transaction_id.includes(searchOrder)
      );
    }
    setOrdersData(filteredOrders);
  }, [paymentMethod, paymentStatus, searchOrder]);

  const searchOrderHandler = (e) => {
    setSearchOrder(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [paymentMethod, paymentStatus, searchOrder, applyFilters]);

  const toggleRowHandler = (orderId) => {
    setSelectRow((prevRow) => (prevRow === orderId ? null : orderId));
  };
  return (
    <div>
      <h1>Orders</h1>
      <Flex justify='space-between' gap={20}>
        <Input
          type='text'
          placeholder='Search Orders'
          value={searchOrder}
          onChange={searchOrderHandler}
          style={{ marginBottom: "20px", borderRadius: 30 }}
        />
        <NavLink to='/orders/create'>
          <Button type='primary' size='large'>
            Create Order
          </Button>
        </NavLink>
      </Flex>
      <Flex gap={20} style={{ marginBottom: 20 }}>
        <h3>Filters</h3>
        <Select
          defaultValue='all'
          style={{
            width: 80,
          }}
          onChange={(value) => setPaymentMethod(value)}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "cash",
              label: "Cash",
            },
            {
              value: "card",
              label: "Card",
            },
          ]}
        />
        <Select
          defaultValue='all'
          style={{
            width: 120,
          }}
          onChange={(value) => setPaymentStatus(value)}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "completed",
              label: "Completed",
            },
            {
              value: "pending",
              label: "Pending",
            },
          ]}
        />
      </Flex>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Transaction Id</th>
            <th>Sale Person Id</th>
            <th>Payment Mode</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <Fragment key={order.id}>
              <tr
                className={`${styles.row} ${
                  selectRow === order.id ? styles.active : ""
                }`}
              >
                <td onClick={() => toggleRowHandler(order.id)}>
                  {selectRow === order.id ? (
                    <MinusCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#12A5BD",
                        cursor: "pointer",
                      }}
                      className={styles["toggle-icon"]}
                    />
                  ) : (
                    <PlusCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#12A5BD",
                        cursor: "pointer",
                      }}
                      className={styles["toggle-icon"]}
                    />
                  )}
                </td>
                <td>{order.id}</td>
                <td>{order.transaction_id}</td>
                <td>{order.sale_staff_id}</td>
                <td>{order.payment_mode}</td>
                <td>{order.payment_status}</td>
              </tr>
              {selectRow === order.id && (
                <tr>
                  <td colSpan='6'>
                    <div className={styles["order-details"]}>
                      <h3 style={{ marginBottom: 20 }}>Order Details</h3>
                      <table className={styles["details-table"]}>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Selling Price</th>
                            <th>Stock Type</th>
                            <th>Fulfillment Store ID</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.size}</td>
                              <td>{item.color}</td>
                              <td>{item.selling_price}</td>
                              <td>{item.stock_type}</td>
                              <td>{item.fulfilment_store_id}</td>
                              <td>{item.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
