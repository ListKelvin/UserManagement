import { Task } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  task: Task | null;
};
const initialState: StateType = {
  task: null,
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    clearTask: (state) => {
      state.task = null;
    },
  },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
