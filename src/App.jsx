import { ConfigProvider } from "antd";
import "./App.css";
import MainSide from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
          <BrowserRouter>
            <ConfigProvider
              theme={{
                components: {
                  Layout: {
                    bodyBg: "#12A5BD",
                    lightSiderBg: "#12A5BD",
                  },
                  Button: {
                    colorPrimary: "#232323",
                    borderRadius: "28px",
                    defaultHoverBg: "#000",
                  },
                  Select: {
                    borderRadius: "28px",
                    colorPrimary: "#12A5BD",
                    backgroundColor: "#12A5BD",
                  },
                },
              }}
            >
              <MainSide />
            </ConfigProvider>
          </BrowserRouter>
    </>
  );
}

export default App;
