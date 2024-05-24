import { useCallback, useEffect, useState } from "react";
import { products } from "../../mockData/products";
import styles from "./products.module.css";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { Button, Flex, Input, Select, Table, Tag } from "antd";

const Products = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          className={styles["product-image"]}
          src={image}
          alt=''
          width={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Store ID/Quantity",
      dataIndex: "inventory",
      key: "inventory",
      render: (inventory) =>
        inventory.map((item) => (
          <p key={item.store_id}>
            {item.store_id}/{item.quantity}
          </p>
        )),
    },
    {
      title: "Stock",
      dataIndex: "inventory",
      key: "inventory",
      render: (inventory) => outOfStockHandler(inventory),
    },
  ];

  const [searchProduct, setSearchProduct] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [stockAvailable, setStockAvailable] = useState("all");
  const storeId = JSON.parse(localStorage.getItem("store_id"));
  const [productsData, setProductsData] = useState(products);

  const applyFilters = useCallback(() => {
    let filteredProducts = products;
    if (stockAvailable !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        const currentInventory = inventoryHandler(product.inventory);
        const inStock = currentInventory.some((item) => item.quantity > 0);
        return stockAvailable === "inStock" ? inStock : !inStock;
      });
    }
    if (searchProduct) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.id.toString().includes(searchProduct) ||
          product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }
    setProductsData(filteredProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockAvailable, searchProduct]);

  const searchProductHandler = (e) => {
    setSearchProduct(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [stockAvailable, searchProduct, applyFilters]);

  const inventoryHandler = useCallback(
    (inventory) => {
      const filterStoreInventory = inventory.filter(
        (item) => parseInt(item.store_id) === storeId
      );
      return filterStoreInventory;
    },
    [storeId]
  );

  const outOfStockHandler = useCallback(
    (inventory) => {
      const storeInventory = inventoryHandler(inventory);
      if (storeInventory?.length > 0) {
        if (storeInventory[0]?.quantity > 0) {
          return <Tag color='green'>In stock</Tag>;
        } else {
          return <Tag color='red'>Out of stock</Tag>;
        }
      }
    },
    [inventoryHandler]
  );

  const handleCancel = () => {
    setShowAddProductModal(false);
  };

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <h1>Products</h1>
        <Flex gap={20} justify='space-between' className={styles.row}>
          <Input
            type='text'
            placeholder='Search Products by name/id'
            value={searchProduct}
            onChange={searchProductHandler}
            style={{borderRadius: 30}}
          />
          <div className={styles["add-btn"]}>
            <Button
              size='large'
              type='primary'
              className={styles.button}
              onClick={() => setShowAddProductModal(true)}
            >
              Add Products
            </Button>
          </div>
        </Flex>
        <Flex gap={20} style={{ marginBottom: 20 }}>
          <h3>Filters</h3>
          <Select
            defaultValue='all'
            style={{
              width: 120,
            }}
            onChange={(value) => setStockAvailable(value)}
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "inStock",
                label: "In Stock",
              },
              {
                value: "outOfStock",
                label: "Out of Stock",
              },
            ]}
          />
        </Flex>
        <div className={styles["inner-container"]}>
          <Table
            dataSource={productsData}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
      <AddProductModal
        handleCancel={handleCancel}
        showModal={showAddProductModal}
        setProductsData={setProductsData}
      />
    </section>
  );
};

export default Products;
