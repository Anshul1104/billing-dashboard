import { Button, Col, Flex, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { products } from "../../../mockData/products";
import styles from "./step1.module.css";
import SaleSummary from "../SaleSummary/SaleSummary";
import { GlobalContext } from "../../../context/GlobalContext";
import MTOConfirmationModal from "../../../components/MTOConfirmationModal/MTOConfirmationModal";
import OtherInventoryConfirmationModal from "../../../components/OtherInventoryConfirmationModal/OtherInventoryConfirmationModal";
import { filterProductsByValue } from "../../../util/searchUtils.js";

const Step1 = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [showMTOConfirmationModal, setShowMTOConfirmationModal] =
    useState(false);
  const [
    showOtherInventoryConfirmationModal,
    setShowOtherInventoryConfirmationModal,
  ] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const storeId = JSON.parse(localStorage.getItem("store_id"));
  const { finalProducts, setFinalProducts, setCreateOrder } =
    useContext(GlobalContext);
  const [productsData, setProductsData] = useState(products);

  const searchProductHandler = (e) => {
    const value = e.target.value;
    setSearchProduct(value);
    const filteredProducts = filterProductsByValue(products, value, [
      "id",
      "title",
    ]);
    setProductsData(filteredProducts);
  };

  const addToCartHandler = (product) => {
    delete product.image;
    const currentStoreInventory = product.inventory.find(
      (item) => item.store_id === storeId
    );

    if (currentStoreInventory && currentStoreInventory.quantity > 0) {
      setFinalProducts((prevProducts) => {
        const existingProduct = prevProducts.find(
          (item) => item.id === product.id
        );
        if (existingProduct) {
          return prevProducts.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  selling_price: product.price,
                  billing_store_id: storeId,
                  fulfilment_store_id: storeId,
                  quantity: item.quantity + 1,
                  stock_type: "in-store",
                }
              : item
          );
        } else {
          return [
            ...prevProducts,
            {
              ...product,
              quantity: 1,
              selling_price: product.price,
              billing_store_id: storeId,
              fulfilment_store_id: storeId,
              stock_type: "in-store",
            },
          ];
        }
      });
    } else {
      const otherStoreInventory = product.inventory.find(
        (item) => item.store_id !== storeId && item.quantity > 0
      );
      if (otherStoreInventory) {
        setSelectedProduct({
          ...product,
          selling_price: product.price,
          billing_store_id: storeId,
          fulfilment_store_id: otherStoreInventory.store_id,
          store_name: otherStoreInventory.store_id,
        });
        setShowOtherInventoryConfirmationModal(true);
      } else {
        console.log("Product is out of stock in all stores");
      }
    }
  };

  const cancelOtherInventoryModalHandler = () => {
    setShowOtherInventoryConfirmationModal(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    setCreateOrder(finalProducts);
  }, [finalProducts, setCreateOrder]);

  useEffect(() => {
    addInventoryQuantities();
  }, []);

  const incrementQuantity = (productId) => {
    setFinalProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setFinalProducts((prevProducts) =>
      prevProducts
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const isInCart = (productId) =>
    finalProducts.some((item) => item.id === productId);

  const getQuantity = (productId) =>
    finalProducts.find((item) => item.id === productId)?.quantity || 0;

  const addInventoryQuantities = () => {
    const updatedProducts = products.map((product) => {
      const totalQuantity = product.inventory.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...product,
        totalQuantity,
      };
    });
    setProductsData(updatedProducts);
  };

  const handleMTOConfirmationModal = () => {
    setShowMTOConfirmationModal(false);
  };
  return (
    <section className={styles["top-container"]}>
      <Row>
        <Col span={16}>
          <div className='cart-container'>
            <Flex gap={20} style={{ marginBottom: "20px" }}>
              <Input
                type='text'
                placeholder='Search Product'
                value={searchProduct}
                onChange={searchProductHandler}
                style={{ borderRadius: "28px" }}
              />
              <Button size='large'>Scan Product</Button>
            </Flex>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Store ID/Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsData?.map((product) => {
                  const isProductInCart = isInCart(product.id);
                  const quantityInCart = getQuantity(product.id);
                  const currentStoreInventory = product.inventory.find(
                    (item) => item.store_id == storeId
                  );
                  const otherStoreInventory = product.inventory.find(
                    (item) => item.store_id !== storeId && item.quantity > 0
                  );
                  return (
                    <tr key={product?.id}>
                      <td>{product?.id}</td>
                      <td>
                        {product?.title} - {product?.sizes[0]}
                      </td>
                      <td>{product?.price}</td>
                      <td>
                        <ul>
                          {product?.inventory?.map((inv) => (
                            <li key={inv.store_id}>
                              {inv.store_id}/{inv.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        {isProductInCart ? (
                          <div>
                            <Button
                              onClick={() => decrementQuantity(product.id)}
                            >
                              -
                            </Button>
                            <span style={{ fontSize: 16 }}>
                              {" "}
                              {quantityInCart}{" "}
                            </span>
                            <Button
                              onClick={() => incrementQuantity(product.id)}
                            >
                              +
                            </Button>
                          </div>
                        ) : currentStoreInventory &&
                          currentStoreInventory.quantity > 0 ? (
                          <Button
                            type='primary'
                            size='large'
                            onClick={() => addToCartHandler(product)}
                          >
                            Add to Cart
                          </Button>
                        ) : otherStoreInventory ? (
                          <Button
                            type='primary'
                            size='large'
                            onClick={() => {
                              addToCartHandler(product);
                            }}
                          >
                            Add from Other Store
                          </Button>
                        ) : (
                          <>
                            <Button
                              type='primary'
                              onClick={() => setShowMTOConfirmationModal(true)}
                            >
                              MTO
                            </Button>
                            <MTOConfirmationModal
                              showModal={showMTOConfirmationModal}
                              handleCancel={handleMTOConfirmationModal}
                              product={product}
                            />
                          </>
                        )}

                        <OtherInventoryConfirmationModal
                          showModal={showOtherInventoryConfirmationModal}
                          handleCancel={cancelOtherInventoryModalHandler}
                          selectedProduct={selectedProduct}
                          setSelectedProduct={setSelectedProduct}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Col>
        <Col span={8}>
          <div className='payment-container'>
            <SaleSummary />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Step1;
