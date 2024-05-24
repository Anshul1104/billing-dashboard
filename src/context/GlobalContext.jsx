/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalData = ({ children }) => {
  const [finalProducts, setFinalProducts] = useState([]);
  const [createOrder, setCreateOrder] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        finalProducts,
        setFinalProducts,
        createOrder,
        setCreateOrder,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedCustomer,
        setSelectedCustomer,
        selectedSalesPerson,
        setSelectedSalesPerson,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalData;
