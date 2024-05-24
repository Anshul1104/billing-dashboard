/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Checkbox, Input, Modal } from "antd";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { sizeOptions } from "../../mockData/sizeOptions";

const MTOConfirmationModal = ({ showModal, handleCancel, product }) => {
  const { setFinalProducts } = useContext(GlobalContext);

  const [remarks, setRemarks] = useState("");

  const storeId = JSON.parse(localStorage.getItem("store_id"));

  return (
    <>
      <Modal
        title='Confirm'
        open={showModal}
        onCancel={handleCancel}
        centered
        destroyOnClose
        okText='Yes'
        onOk={async () => {
          const {
            inventory,
            price,
            totalQuantity,
            ...productWithoutInventory
          } = product;
          setFinalProducts((prevProducts) => {
            const existingProduct = prevProducts.find(
              (item) => item.id === product.id
            );
            if (existingProduct) {
              return prevProducts.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      product_id: product.id,
                      selling_price: product.price,
                      stock_type: "MTO",
                      billing_store_id: storeId,
                      fulfilment_store_id: null,
                      remarks: remarks ?? "Manufacture",
                      quantity: item.quantity + 1,
                    }
                  : item
              );
            } else {
              return [
                ...prevProducts,
                {
                  ...productWithoutInventory,
                  product_id: product.id,
                  selling_price: product.price,
                  stock_type: "MTO",
                  billing_store_id: storeId,
                  fulfilment_store_id: null,
                  remarks: remarks ?? "Manufacture",
                  quantity: 1,
                },
              ];
            }
          });
          handleCancel();
        }}
      >
        <h4>Do you want to manufacture this and deliver to customer? </h4>
        <h4 style={{ marginTop: 20, fontSize: 16, fontWeight: 500 }}>
          Remarks
        </h4>
        <Input.TextArea
          placeholder='Enter remarks'
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default MTOConfirmationModal;
