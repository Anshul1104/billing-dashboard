import { Col, Row, Table } from "antd";
import SaleSummary from "../SaleSummary/SaleSummary";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const Step5 = () => {
  const { finalProducts } = useContext(GlobalContext);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "",
      key: "",
      render: (product) => (
        <span>
          {product?.title} - {product?.sizes[0]}
        </span>
      ),
    },
    {
      title: "Selling Price",
      dataIndex: "selling_price",
      key: "selling_price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  return (
    <>
      <h3>Review</h3>
      <Row>
        <Col span={16}>
          <div className=''>
            <Table
              dataSource={finalProducts}
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

export default Step5;
