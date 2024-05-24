export const filterProductsByValue = (items, searchValue, properties) => {
  return items.filter((item) =>
    properties.some((prop) =>
      item[prop]?.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );
};
