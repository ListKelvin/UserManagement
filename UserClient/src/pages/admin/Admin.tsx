import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Space, Table, Input, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import { UserType } from "../../types";
import { useAddUserMutation, useGetUsersQuery } from "../../services/userApi";
import { SearchProps } from "antd/es/input";

const { Search } = Input;
function AdminPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: users, isLoading } = useGetUsersQuery();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserType[]>();

  const [addUserMutation, { isLoading: addUserLoading }] = useAddUserMutation();
  const columns: TableProps<UserType>["columns"] = [
    {
      title: "ID",

      render: (_item, _record, index) => {
        return <p key={index}>{index + 1}</p>;
      },
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birth Date",
      dataIndex: "birthdate",
      key: "birthdate",
      render: (birthdate) =>
        birthdate ? new Date(birthdate).toLocaleDateString() : "-",
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_) => (
    //     <Space size="middle">
    //       <Button type="primary">Edit</Button>
    //       <Button danger>Delete</Button>
    //     </Space>
    //   ),
    // },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleAddUser = async (user: any) => {
    try {
      const addedUser = await addUserMutation(user);
      console.log("addedUser", addedUser);

      const messageSucess = "Add User successfully!";
      form.resetFields();
      handleOk(messageSucess);
    } catch (error) {
      message.error("Add user unsuccessful. Please try again.");
    }
  };

  const handleOk = (values: any) => {
    message.success(values);
    setIsModalVisible(false);
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    if (info?.source == "input") {
      const searchDate = userData?.filter((user) =>
        user.username?.toLowerCase().includes(value.toLowerCase())
      );
      setUserData(searchDate);
    } else if (info?.source == "clear") {
      setUserData(users);
    }
  };
  useEffect(() => {
    if (users) {
      setUserData(users);
      console.log(userData);
    }
  }, [users]);
  return (
    <div>
      <Space>
        <Search
          placeholder="input search text"
          allowClear
          // onChange={onSearch}
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button
          style={{ marginBottom: "10px" }}
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined style={{ fontSize: "20px" }} />}
        >
          Add User
        </Button>
      </Space>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={userData}
        pagination={false}
      />
      {userData && (
        <AddUserModal
          isLoading={addUserLoading}
          visible={isModalVisible}
          handleOk={handleAddUser}
          handleCancel={handleCancel}
          form={form}
          existingEmails={userData.map((user) => user.email)}
        />
      )}
    </div>
  );
}

export default AdminPage;
