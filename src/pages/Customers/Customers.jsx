import { Input, Table, Tag } from "antd";
import { customers } from "../../mockData/customers";
import { useState } from "react";
import { filterProductsByValue } from "../../util/searchUtils.js";

const Customers = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Whatsapp Opted?",
      dataIndex: "isWhatsappOpted",
      key: "isWhatsappOpted",
      render: (isWhatsappOpted) => {
        return isWhatsappOpted ? (
          <Tag color='green'>Yes</Tag>
        ) : (
          <Tag color='red'>No</Tag>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "addresses",
      key: "addresses",
      render: (addresses) => (
        <span>
          {addresses[0].addressline}, {addresses[0].city} , {addresses[0].state}{" "}
          - {addresses[0].pincode}
        </span>
      ),
    },
  ];
  const [searchCustomers, setSearchCustomers] = useState("");
  const [customersData, setCustomersData] = useState(customers);
  const searchCustomerHandler = (e) => {
    const value = e.target.value;
    setSearchCustomers(value);
    const filteredProducts = filterProductsByValue(customers, value, [
      "id",
      "name",
    ]);
    setCustomersData(filteredProducts);
  };
  return (
    <div>
      <h1>Customers</h1>
      <Input
        type='text'
        placeholder='Search Orders'
        value={searchCustomers}
        onChange={searchCustomerHandler}
        style={{ marginBottom: "20px", borderRadius: 30 }}
      />
      <Table dataSource={customersData} columns={columns} pagination={false} />
    </div>
  );
};

export default Customers;
