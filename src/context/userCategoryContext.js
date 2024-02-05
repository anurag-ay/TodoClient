import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserInfo } from "./userInfoContext";
import axios, { getCategoriesByUserIdRoute } from "../api/api";

const UserCategoryContext = createContext(null);

export function useUserCategory() {
  return useContext(UserCategoryContext);
}

function UserCategoryProvider({ children }) {
  const userInfo = useUserInfo();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (!userInfo) return;
    async function getUserCategories() {
      try {
        const res = await axios.get(
          `${getCategoriesByUserIdRoute}/${userInfo._id}`
        );
        const categories = res.data;
        const filteredCategories = categories.filter(
          (category) => category._id !== userInfo.allTaskCategory
        );
        setCategories(filteredCategories);
      } catch (err) {
        console.log(err);
      }
    }
    getUserCategories();
  }, [userInfo]);

  return (
    <UserCategoryContext.Provider value={[categories, setCategories]}>
      {children}
    </UserCategoryContext.Provider>
  );
}

export default UserCategoryProvider;
