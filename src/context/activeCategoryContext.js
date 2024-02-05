import React, { createContext, useContext, useEffect, useState } from "react";
import { useRenderTask } from "./renderTasksContext";
import { useUserTasks } from "./userTaskContext";
import { useUserInfo } from "./userInfoContext";

const ActiveCategoryContext = createContext();

export function useActiveCategory() {
  return useContext(ActiveCategoryContext);
}

function ActiveCategoryProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [, setRenderTasks] = useRenderTask();
  const [userTasks] = useUserTasks();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (!userInfo) return;
    setActiveCategory(userInfo.allTaskCategory);
  }, [userInfo]);

  useEffect(() => {
    if (!userTasks) return;

    if (activeCategory === "done") {
      const doneTask = userTasks.filter((task) => task.isDone === true);
      setRenderTasks([]);
      setRenderTasks([...doneTask]);
    } else if (activeCategory === "today") {
      const today = new Date();
      const todayTasks = userTasks.filter((task) => {
        const givenDate = new Date(task.createdAt);
        return (
          givenDate.toLocaleDateString() === today.toLocaleDateString() &&
          task.isDone === false
        );
      });
      setRenderTasks([]);
      setRenderTasks([...todayTasks]);
    } else if (activeCategory === "important") {
      const importantTask = userTasks.filter(
        (task) => task.isImportant === true && task.isDone === false
      );
      setRenderTasks([]);
      setRenderTasks([...importantTask]);
    } else {
      const filteredList = userTasks.filter(
        (task) => task.category === activeCategory && task.isDone === false
      );
      setRenderTasks([]);
      setRenderTasks([...filteredList]);
    }
  }, [activeCategory, userTasks, setRenderTasks]);

  return (
    <ActiveCategoryContext.Provider value={[activeCategory, setActiveCategory]}>
      {children}
    </ActiveCategoryContext.Provider>
  );
}

export default ActiveCategoryProvider;
