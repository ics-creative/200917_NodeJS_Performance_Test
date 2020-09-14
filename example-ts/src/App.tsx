import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import StatusFilter from "./StatusFilter";
import { StatusType } from "./StatusType";
import { Todo } from "./Todo";
import TodoItem from "./TodoItem";

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [items, setItems] = useState<Todo[]>([]);
  const [option, setOption] = useState<StatusType>("all");

  const handleClickAdd = useCallback(() => {
    if (!inputText.trim()) {
      return;
    }

    setItems([
      ...items,
      { id: Date.now(), label: inputText, completed: false },
    ]);
    setInputText("");
  }, [inputText, items, setInputText]);

  const handleChangeInput = useCallback(
    (event: any) => {
      setInputText(event.target.value);
    },
    [setInputText]
  );

  const handleDeleteClick = useCallback(
    (todo: Todo) => {
      setItems(items.filter((item) => item.id !== todo.id));
    },
    [items]
  );

  const handleChangeItem = useCallback(
    (todo: Todo) => {
      setItems(
        items.map((item) =>
          item.id === todo.id
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        )
      );
    },
    [items]
  );

  const handleChangeFilter = useCallback(
    (option: StatusType) => {
      setOption(option);
    },
    [option]
  );

  const list = useMemo(() => {
    const filtered = items.filter((todo) => {
      switch (option) {
        case "all":
          return true;
        case "active":
          return todo.completed === false;
        case "completed":
          return todo.completed === true;
      }
    });
    return (
      <ul>
        {filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={handleChangeItem}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
    );
  }, [items, option]);

  const filter = useMemo(() => <StatusFilter onChange={handleChangeFilter} />, [
    handleChangeFilter,
  ]);

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChangeInput} />
      <button onClick={handleClickAdd}>追加</button>
      {list}
      {filter}
    </div>
  );
};

export default App;
