import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosList: [],
};

const TodoReducer = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    addTodo(state, action) {
      const { id, content, completed } = action.payload;
      state.todosList = [{ id, content, completed }, ...state.todosList];
    },
    setCompleted(state, action) {
      let id = action.payload;
      const todo = state.todosList.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, setCompleted } = TodoReducer.actions;
export default TodoReducer.reducer;
