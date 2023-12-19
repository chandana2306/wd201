const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    return all.filter((item) => {
      return (
        new Date(item.dueDate).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      );
    });
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    return all.filter((item) => {
      return (
        new Date(item.dueDate).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0]
      );
    });
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return all.filter((item) => {
      return (
        new Date(item.dueDate).setHours(0, 0, 0, 0) >
        new Date().setHours(0, 0, 0, 0)
      );
    });
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    return list
      .map((item) => {
        return `[${item.completed ? "x" : " "}] ${item.title} ${
          new Date(item.dueDate).setHours(0, 0, 0, 0) ===
          new Date().setHours(0, 0, 0, 0)
            ? ""
            : item.dueDate
        }`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
