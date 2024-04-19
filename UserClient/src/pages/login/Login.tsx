import { Alert, Button, Form, Input, notification } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userApi";
import "./Login.css"; // Import your CSS file

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState<string>(""); // Khai báo state error

  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (values: any) => {
    try {
      const result = await loginUser({
        email: values.email,
        password: values.password,
      });

      if (result.data && result.data.token) {
        localStorage.setItem("token", result.data.token);

        navigate("/");
        notification.success({
          message: "Login successfully",
          description: "Welcome to FAMS !",
        });
      } else {
        notification.error({
          message: "Login error",
          description: "Invalid email or password. Try again!",
        });
        form.resetFields(); // Xóa dữ liệu trong các ô input
      }
    } catch (error) {
      setError("An error occurred while attempting to log in");
    }
  };
  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center", color: "#FFF5E0" }}>Login</h1>
      <Form form={form} onFinish={handleSubmit}>
        {error && (
          <>
            <Alert message={error} type="error" showIcon />
            <br />
          </>
        )}
        {/* Hiển thị thông báo lỗi */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
              message: "Please input valid Email!",
            },
          ]}
        >
          <Input type="" placeholder="Email" className="form-input" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" className="form-input" />
        </Form.Item>
        {/* <div className="forget-pass ">
          <Link to={"/forget-password"}>Forget Password</Link>
        </div> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="submit-btn"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
