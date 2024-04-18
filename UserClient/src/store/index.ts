import { taskApi } from "../services/taskApi";
import { userApi } from "../services/userApi";
import { configureStore } from "@reduxjs/toolkit";
import task from "../slice/task";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    task: task,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, taskApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
