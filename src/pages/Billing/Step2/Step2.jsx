import { Button, Col, Flex, Input, Row, Table } from "antd";
import { useContext, useState } from "react";
import { customers } from "../../../mockData/customers";
import AddNewCustomerModal from "../../../components/AddNewCustomerModal/AddNewCustomerModal";
import SaleSummary from "../SaleSummary/SaleSummary";
import { GlobalContext } from "../../../context/GlobalContext";
import { filterProductsByValue } from "../../../util/searchUtils.js";

const Step2 = () => {
  const [searchCustomers, setSearchCustomers] = useState("");
  const [customersData, setCustomersData] = useState(customers);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const { selectedCustomer, setSelectedCustomer } = useContext(GlobalContext);

  const searchCustomerHandler = (e) => {
    const value = e.target.value;
    setSearchCustomers(value);
    const filteredProducts = filterProductsByValue(customers, value, [
      "id",
      "name",
    ]);
    setCustomersData(filteredProducts);
  };

  const handleCancel = () => {
    setShowAddCustomerModal(false);
  };

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
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (customer) => (
        <Button
          size='large'
          type={selectedCustomer?.id === customer.id ? "primary" : "default"}
          onClick={() => {
            setSelectedCustomer(customer);
          }}
        >
          {selectedCustomer?.id === customer.id ? "Selected" : "Select"}
        </Button>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={16}>
          <div className=''>
            <Flex gap={20} style={{ marginBottom: "20px" }}>
              <Input
                type='text'
                placeholder='Search Customer'
                value={searchCustomers}
                onChange={searchCustomerHandler}
                style={{ borderRadius: "28px" }}
              />
              <Button
                size='large'
                onClick={() => setShowAddCustomerModal(true)}
              >
                Add new customer
              </Button>
            </Flex>
            <Table
              dataSource={customersData}
              columns={columns}
              pagination={false}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className='payment-container'>
            <SaleSummary />
          </div>
        </Col>
      </Row>
      <AddNewCustomerModal
        handleCancel={handleCancel}
        showModal={showAddCustomerModal}
      />
    </>
  );
};

export default Step2;
