/* eslint-disable react/prop-types */

import { Modal } from "antd";
import { useCallback, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const OtherInventoryConfirmationModal = ({
  showModal,
  handleCancel,
  selectedProduct,
}) => {
  const { setFinalProducts } = useContext(GlobalContext);

  const storeId = JSON.parse(localStorage.getItem("store_id"));

  const handleConfirm = useCallback(() => {
    delete selectedProduct.inventory;
    delete selectedProduct.totalQuantity;
    setFinalProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) => item.id === selectedProduct.id
      );
      if (existingProduct) {
        return prevProducts.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                selling_price: selectedProduct.price,
                stock_type: "other-store",
                billing_store_id: storeId,
                fulfilment_store_id: selectedProduct.store_name,
                remarks: "Ship from other store",
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        return [
          ...prevProducts,
          {
            ...selectedProduct,
            selling_price: selectedProduct.price,
            stock_type: "other-store",
            billing_store_id: storeId,
            fulfilment_store_id: selectedProduct.store_name,
            remarks: "Ship from other store",
            quantity: 1,
          },
        ];
      }
    });
    handleCancel();
  }, [selectedProduct, storeId]);

  return (
    <>
      <Modal
        title='Confirm'
        open={showModal}
        onCancel={handleCancel}
        centered
        destroyOnClose
        okText='Yes'
        onOk={handleConfirm}
      >
        <h4>
          This product will be serviced from another store (Store Name:{" "}
          {selectedProduct?.store_name}). Do you want to continue?
        </h4>
      </Modal>
    </>
  );
};

export default OtherInventoryConfirmationModal;
