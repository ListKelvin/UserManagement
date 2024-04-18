import React, { useState } from "react";
import type { FormInstance } from "antd";
import { Modal, Form, Input, DatePicker, message, FormProps } from "antd";
import { validationPatterns } from "../pages/admin/Validation";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  datebirth?: string;
};
const AddUserModal = ({
  visible,
  handleOk,
  handleCancel,
  existingEmails,
  form,
  isLoading,
}: {
  isLoading: boolean;
  visible: boolean;
  handleOk: (obj?: any) => any;
  handleCancel: (obj?: any) => any;
  existingEmails: string[] | [];
  form: FormInstance;
}) => {
  const [emailError, setEmailError] = useState("");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { email } = values;
    const emailExists = existingEmails?.includes(email);
    if (emailExists) {
      setEmailError("Email already exists. Please choose a different email.");
      return;
    }

    const dataToSend = { ...values };

    setEmailError("");

    handleOk(dataToSend);
    // form.resetFields();
  };

  return (
    <Modal
      open={visible}
      title="Add User"
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText={isLoading ? "Adding..." : "Add User"}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        name="addUserForm"
        initialValues={{ userType: "Super Admin" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="username"
          hasFeedback
          rules={[
            { required: true, message: "Please enter user name!" },
            {
              pattern: validationPatterns.name.pattern,
              message: validationPatterns.name.message,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            {
              pattern: validationPatterns.email.pattern,
              required: true,
              message: validationPatterns.email.message,
              type: "email",
            },
          ]}
          validateStatus={emailError ? "error" : ""}
          help={emailError}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter password !" },
            {
              pattern: validationPatterns.password.pattern,
              message: validationPatterns.password.message,
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          label="Re-Type Password"
          name="retypePassword"
          rules={[
            { required: true, message: "Please re-type the password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Re-type password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="birthdate"
          rules={[
            { required: true, message: "Please select user date of birth!" },
            () => ({
              validator(_, value) {
                const selectedYear = value && value.year();
                if (
                  selectedYear &&
                  selectedYear > 1914 &&
                  selectedYear <= 2006
                ) {
                  return Promise.resolve();
                } else {
                  form.resetFields(["DOB"]);
                  if (selectedYear > 2006 || selectedYear < 1914) {
                    message.error("Invalid date of birth!.");
                  }
                  return Promise.reject(new Error("Invalid date of birth!"));
                }
              },
            }),
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
