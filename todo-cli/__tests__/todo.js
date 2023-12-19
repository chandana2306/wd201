/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo Test Suite", () => {
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  let dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1)),
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1)),
  );

  beforeAll(() => {
    add({
      title: "Complete coding exercise",
      dueDate: yesterday,
      completed: false,
    });
    add({
      title: "Review monthly budget",
      dueDate: yesterday,
      completed: true,
    });
    add({
      title: "Service Vehicle inspection",
      dueDate: today,
      completed: false,
    });
    add({
      title: "Prepare tax documents",
      dueDate: tomorrow,
      completed: false,
    });
    add({ title: "Pay internet bill", dueDate: tomorrow, completed: false });
  });

  test("Adding a New Todo", () => {
    const initialTodoCount = all.length;
    add({ title: "Add new todo", dueDate: tomorrow, completed: false });
    expect(all.length).toBe(initialTodoCount + 1);
  });

  test("Marking Todo As Complete", () => {
    markAsComplete(3);
    expect(all[3]["completed"]).toBe(true);
  });

  test("Retrieval Of Overdue Items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(2);
  });

  test("Retrieval Of Today's Items", () => {
    const todayItems = dueToday();
    expect(todayItems.length).toBe(1);
  });

  test("Retrieval Of Later Items", () => {
    const laterItems = dueLater();
    expect(laterItems.length).toBe(3);
  });
});
