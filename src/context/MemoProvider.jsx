import { useCallback, useMemo, useState } from "react";
import { MemoContext } from "./MemoContext";
import { initialCategories } from "../data/initialCategories";
import { initialTasks } from "../data/initialTasks";
import { STATUS } from "../constants/columns";
import { createId } from "../utils/id";

export default function MemoProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories);
  const [tasks, setTasks] = useState(initialTasks);

  const addCategory = useCallback(({ name, description }) => {
    const category = { id: createId(), name, description };
    setCategories((prev) => [...prev, category]);
    return category;
  }, []);

  const getCategory = useCallback((id) => categories.find((category) => category.id === id), [categories]);

  const addTask = useCallback((categoryId, data) => {
    const task = {
      id: createId(),
      categoryId,
      status: STATUS.NEW,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id, data) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...data } : task)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const moveTask = useCallback((id, status, beforeId = null) => {
    setTasks((prev) => {
      const task = prev.find((item) => item.id === id);
      if (!task) return prev;

      const rest = prev.filter((item) => item.id !== id);
      let index = beforeId ? rest.findIndex((item) => item.id === beforeId) : -1;

      if (index === -1) {
        const lastIndex = rest.findLastIndex(
          (item) => item.categoryId === task.categoryId && item.status === status
        );
        index = lastIndex === -1 ? rest.length : lastIndex + 1;
      }

      rest.splice(index, 0, { ...task, status });
      return rest;
    });
  }, []);

  const toggleChecklistItem = useCallback((taskId, itemId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)),
            }
          : task
      )
    );
  }, []);

  const taskCountByCategory = useMemo(
    () =>
      tasks.reduce((acc, task) => {
        acc[task.categoryId] = (acc[task.categoryId] || 0) + 1;
        return acc;
      }, {}),
    [tasks]
  );

  const value = useMemo(
    () => ({
      categories,
      tasks,
      taskCountByCategory,
      addCategory,
      getCategory,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      toggleChecklistItem,
    }),
    [categories, tasks, taskCountByCategory, addCategory, getCategory, addTask, updateTask, deleteTask, moveTask, toggleChecklistItem]
  );

  return <MemoContext.Provider value={value}>{children}</MemoContext.Provider>;
}
