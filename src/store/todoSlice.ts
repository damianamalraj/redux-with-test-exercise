import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: { todos: [] as Todo[], filterDesc: false },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: uuidv4(),
        text: action.payload,
      });

      state.todos = state.todos.sort(
        (a, b) =>
          (state.filterDesc ? 1 : -1) * a.text.localeCompare(b.text, "sv", {})
      );
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    sortTodos: (state, action) => {
      state.todos.sort(
        (a, b) => (action.payload ? 1 : -1) * a.text.localeCompare(b.text, "sv")
      );
      state.filterDesc = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, removeTodo, sortTodos } = todoSlice.actions;
