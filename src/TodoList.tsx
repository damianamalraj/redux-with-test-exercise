import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useAppSelector } from "./hooks";
import { useAppDispatch } from "./hooks";
import { addTodo, removeTodo, sortTodos } from "./store/todoSlice";

const TodoList = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.todos);
  const filterDesc = useAppSelector((state) => state.todos.filterDesc);
  const [newTodoText, setNewTodoText] = useState<string>("");

  const addOneTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodo(newTodoText));
    setNewTodoText("");
  };

  return (
    <>
      <form onSubmit={addOneTodo}>
        <input
          placeholder="Skriv en todo..."
          onChange={(event) => setNewTodoText(event.target.value)}
          value={newTodoText}
        ></input>
        <button type="submit" disabled={newTodoText.length === 0}>
          Lägg till
        </button>
      </form>
      <h2>
        Todo
        <button
          onClick={() => {
            dispatch(sortTodos(!filterDesc));
          }}
        >
          {filterDesc ? <FaArrowUp /> : <FaArrowDown />}
        </button>
      </h2>

      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}{" "}
              <button onClick={() => dispatch(removeTodo({ id: todo.id }))}>
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Du har inga todos</p>
      )}
    </>
  );
};

export default TodoList;
