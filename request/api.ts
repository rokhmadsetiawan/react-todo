import axios from "axios";

export const BASE_URL = "https://todo.api.devcode.gethired.id/";
export const EMAIL = "rstdps@gmail.com";

const request = axios.create({
  baseURL: BASE_URL,
});

// ACTIVITY GROUPS API

export const getActivityGroups = async () => {
  const { data } = await request.get("activity-groups", {
    params: {
      email: EMAIL,
    },
  });
  return data.data;
};

export const getActivityGroupDetail = async (
  id: string | string[] | undefined
) => {
  const { data } = await request.get(`activity-groups/${id}`);
  return data;
};

export const createActivityGroup = async () => {
  return await request.post("activity-groups", {
    title: "New Activity",
    email: EMAIL,
  });
};

export const updateActivityGroup = async ({ id, title }: ActivityGroup) => {
  return await request.patch(`activity-groups/${id}`, { title: title });
};

export const deleteActivityGroup = async (id: string) => {
  return await request.delete(`activity-groups/${id}`);
};

// TODO ITEMS API
export const getTodoItems = async (
  activityGroupId: string | string[] | undefined
) => {
  const { data } = await request.get("todo-items", {
    params: {
      activity_group_id: activityGroupId,
    },
  });
  return data.data;
};

export const getTodoItemsDetail = async (id: string) => {
  const { data } = await request.get(`todo-items/${id}`);
  return data;
};

export const createTodoItem = async (todoItem: TodoItem) => {
  return await request.post("todo-items", todoItem);
};

export const updateTodoItem = async (id: string, todoItem: TodoItem) => {
  return await request.patch(`todo-items/${id}`, todoItem);
};

export const deleteTodoItem = async (id: string) => {
  return await request.delete(`todo-items/${id}`);
};

export default request;
