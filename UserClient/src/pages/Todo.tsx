import { Button, Divider, List, Select } from "antd";
import { useGetUsersQuery } from "../services/userApi";
import { CheckCircleTwoTone, MinusSquareOutlined } from "@ant-design/icons";
import {
  useGetTaskByUserIdQuery,
  useUpdateStatusTaskMutation,
} from "../services/taskApi";
import { useEffect, useState } from "react";
import { Task } from "../types";
export default function Todo() {
  const { data, isLoading } = useGetUsersQuery();
  const [userId, setUserId] = useState();
  const [updateLoading, setUpdateLoading] = useState<{
    loading: boolean;
    id: number;
  }>();

  const [mutate] = useUpdateStatusTaskMutation();
  const {
    data: taskData,
    isFetching: isTaskFetching,
    isLoading: isTaskLoading,
  } = useGetTaskByUserIdQuery(userId);
  const [tasks, setTasks] = useState<Task[]>();

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setUserId(value.value);
  };

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
    }
  }, [taskData]);

  function sortTaskPriorities(data: Task[]) {
    if (data) {
      const sortData = [...data];
      const Sorted = sortData?.sort(
        (a, b) => (b.completed === false) - (a.completed === false)
      );
      return Sorted;
    }
    return [];
  }
  return (
    <div>
      <Divider orientation="left" orientationMargin="0">
        User
      </Divider>
      <Select
        loading={isLoading}
        labelInValue
        placeholder="Select user"
        style={{ width: 200 }}
        onChange={handleChange}
        options={data?.map((el) => {
          return { value: el.id, label: el.name, key: el.id };
        })}
      />
      <Divider orientation="left" orientationMargin="0">
        Tasks
      </Divider>
      <List
        style={{ maxHeight: "400px", overflow: "auto" }}
        loading={isTaskFetching}
        itemLayout="horizontal"
        dataSource={sortTaskPriorities(tasks)}
        bordered={true}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                item.completed ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <MinusSquareOutlined style={{ color: "orange" }} />
                )
              }
              title={<span>{item.title}</span>}
            />
            {!item.completed && (
              <Button
                loading={updateLoading?.loading && updateLoading.id === item.id}
                size="small"
                onClick={async () => {
                  setUpdateLoading({ loading: true, id: item.id });
                  const res = await mutate({
                    id: item.id,
                    body: { completed: !item.completed },
                  });
                  console.log("res ", res);
                  if (res.data) {
                    const updateTask = tasks.map((el) => {
                      if (el.id === res.data.id) {
                        return res.data;
                      }
                      return el;
                    });
                    setTasks(updateTask);
                    setUpdateLoading({ loading: false, id: item.id });
                  }
                }}
              >
                Mark done
              </Button>
            )}
          </List.Item>
        )}
      />
      <div>
        Done {`${tasks?.filter((el) => el.completed).length}/${tasks?.length}`}{" "}
        tasks
      </div>
    </div>
  );
}
