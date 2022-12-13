import reducer, { addTodo, removeTodo, sortTodos, Todo } from "./todoSlice";

describe("todoSlice", () => {
  it("It shold add a todo", () => {
    const previousState = { todos: [] as Todo[], filterDesc: false };
    const result = reducer(previousState, addTodo("Hej"));

    expect(result.todos.length).toBe(1);
  });

  it("It shold remove a todo", () => {
    const previousState = {
      todos: [{ id: "7", text: "Hej" }] as Todo[],
      filterDesc: false,
    };
    const result = reducer(previousState, removeTodo({ id: "7" }));

    expect(result.todos.length).toBe(0);
  });

  it("It shold sort", () => {
    const previousState = {
      todos: [{ id: "7", text: "Hej" }] as Todo[],
      filterDesc: false,
    };
    const result = reducer(previousState, sortTodos(true));

    expect(result.filterDesc).toBe(true);
  });
});
