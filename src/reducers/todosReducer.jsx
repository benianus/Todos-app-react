import { getFromLocalStorage, saveInLocalStorage } from "../helpers";
import { v4 as uuidv4 } from "uuid";

export function reducer(prevState, action) {
  switch (action.type) {
    case "create": {
      let newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        isDone: false,
      };
      saveInLocalStorage("allTasks", newTodo);
      return [...prevState, newTodo];
    }

    case "edit": {
      let tasks = prevState.map((t) => {
        return t.id == action.payload.todo.id
          ? { ...t, title: action.payload.title }
          : t;
      });
      saveInLocalStorage("allTasks", tasks);
      return tasks;
    }

    case "complete": {
      let tasks = prevState.map((todo) => {
        if (todo.isDone == false && todo.id == action.payload.task.id) {
          return { ...todo, isDone: true };
        } else if (todo.isDone == true && todo.id == action.payload.task.id) {
          return { ...todo, isDone: false };
        }
        
        return todo;
      });
      saveInLocalStorage("allTasks", tasks);
      return tasks;
    }

    case "delete": {
      let tasks = prevState.filter((t) => {
        return t.id != action.payload.todoId;
      });
      saveInLocalStorage("allTasks", tasks);
      return tasks;
    }

    case "get": {
      const allTasks = getFromLocalStorage("allTasks");
      return allTasks ?? [];
    }

    default: {
      throw Error("Unknown Action: " + action.type);
    }
  }
}
