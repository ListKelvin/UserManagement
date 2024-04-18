import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { URL_API_LOCAL } from "../config";
import { Task } from "../types";

// Define a service using a base URL and expected endpoints
export const taskApi = createApi({
  reducerPath: "tasks",
  tagTypes: ["TaskList"],
  baseQuery: fetchBaseQuery({ baseUrl: URL_API_LOCAL }),
  endpoints: (builder) => ({
    getTaskByUserId: builder.query<Task[], void>({
      query: (userId) => `users/${userId}/todos`,
      // providesTags: (result, _error, _arg) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({ type: "TaskList" as const, id })),
      //         { type: "TaskList", id: "LIST" },
      //       ]
      //     : [{ type: "TaskList", id: "LIST" }],
    }),
    updateStatusTask: builder.mutation<
      Task,
      { body: { completed: boolean }; id: number }
    >({
      query: (payload) => {
        return {
          method: "PATCH",
          url: `/todos/${payload.id}`,
          body: payload.body,
        };
      },
      // invalidatesTags: (res, err, arg) => [{ type: "TaskList", id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTaskByUserIdQuery, useUpdateStatusTaskMutation } = taskApi;
