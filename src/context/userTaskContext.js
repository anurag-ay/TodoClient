import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserInfo } from "./userInfoContext";
import axios, { getAllTaskRoute } from "../api/api";

const UserTasksContext = createContext(null);

export function useUserTasks() {
  return useContext(UserTasksContext);
}

function UserTaskProvider({ children }) {
  const userInfo = useUserInfo();
  const [allTasks, setAllTasks] = useState(null);

  useEffect(() => {
    if (!userInfo) return;
    async function getUserTask() {
      try {
        const res = await axios.get(`${getAllTaskRoute}/${userInfo._id}`);
        const tasks = res.data;
        setAllTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    }

    getUserTask();
  }, [userInfo]);

  return (
    <UserTasksContext.Provider value={[allTasks, setAllTasks]}>
      {children}
    </UserTasksContext.Provider>
  );
}

export default UserTaskProvider;
