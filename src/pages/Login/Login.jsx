import { Button, Flex, Form, Input } from "antd";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/logo.jpg";
import { storeInfo } from "../../mockData/storeInfo";

const Login = () => {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    setAuthenticated(true);
    navigate("/dashboard");
    localStorage.setItem("store_id", JSON.stringify(storeInfo.id));
    localStorage.setItem("isAuth", true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main className={styles["login-section"]}>
      <header className={styles.header}>
        <img src={logo} alt='' />
      </header>
      <Flex vertical align='center'>
        <h1>Login</h1>
        <Form
          className={styles.loginForm}
          name='login'
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          validateMessages={validateMessages}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder='test@gmail.com' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder='password' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </main>
  );
};
export default Login;
