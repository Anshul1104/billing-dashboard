import { useContext, useState } from "react";
import { Button, Col, Input, Row, Table } from "antd";
import { storeStaff } from "../../../mockData/storeStaff";
import SaleSummary from "../SaleSummary/SaleSummary";
import { GlobalContext } from "../../../context/GlobalContext";
import { filterProductsByValue } from "../../../util/searchUtils.js";

const Step3 = () => {
  const [searchStaff, setSearchStaff] = useState("");
  const [staffData, setStaffData] = useState(storeStaff);
  const { selectedSalesPerson, setSelectedSalesPerson } =
    useContext(GlobalContext);

  const searchStaffHandler = (e) => {
    const value = e.target.value;
    setSearchStaff(value);
    const filteredProducts = filterProductsByValue(storeStaff, value, [
      "id",
      "name",
    ]);
    setStaffData(filteredProducts);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (staff) => (
        <Button
          size='large'
          type={selectedSalesPerson.id === staff.id ? "primary" : "default"}
          onClick={() => {
            setSelectedSalesPerson(staff);
          }}
        >
          {selectedSalesPerson.id === staff.id ? "Selected" : "Select"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={16}>
          <div>
            <Input
              type='text'
              placeholder='Search Staff Member'
              value={searchStaff}
              onChange={searchStaffHandler}
              style={{ marginBottom: "20px", borderRadius: "28px" }}
            />
            <Table
              dataSource={staffData}
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
    </>
  );
};

export default Step3;
