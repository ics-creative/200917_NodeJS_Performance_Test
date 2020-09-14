import * as React from "react";
import { useCallback } from "react";
import { Todo } from "./Todo";

type Prop = {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

const TodoItem: React.FC<Prop> = ({ todo, onChange, onDelete }) => {
  const onChangeCallback = useCallback(() => {
    onChange(todo);
  }, [todo, onChange]);
  const onDeleteCallback = useCallback(() => {
    onDelete(todo);
  }, [todo, onDelete]);

  return (
    <li>
      {todo.completed === true ? (
        <del>{todo.label}</del>
      ) : (
        <span>{todo.label}</span>
      )}
      <button onClick={onChangeCallback}>変更</button>
      <button onClick={onDeleteCallback}>削除</button>
    </li>
  );
};

export default TodoItem;
