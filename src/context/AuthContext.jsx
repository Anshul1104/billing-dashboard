/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(false);

const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
