import { Delete, LineWeight } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import axios, { deleteCategoryRoute } from "../../api/api";
import { useUserInfo } from "../../context/userInfoContext";
import { useUserCategory } from "../../context/userCategoryContext";
import { useActiveCategory } from "../../context/activeCategoryContext";
import { useRenderTask } from "../../context/renderTasksContext";
import { useUserTasks } from "../../context/userTaskContext";
import { useResponsive } from "../../context/responsiveContext";
import { useIsProgress } from "../../context/isProgressContext";

function Category({ category }) {
  const { type } = category;
  const userInfo = useUserInfo();
  const [categories, setUserCategory] = useUserCategory();
  const [activeCategory, setActiveCategory] = useActiveCategory();
  const [, setRenderTask] = useRenderTask();
  const [userTasks, setUserTasks] = useUserTasks();
  const [, setRes] = useResponsive();
  const [, setIsProgress] = useIsProgress();

  async function deleteCategory() {
    if (!userInfo) return;
    if (!category) return;
    setIsProgress(true);

    try {
      const newCategoryList = categories.filter(
        (filterCategory) => filterCategory._id !== category._id
      );
      setUserCategory(newCategoryList);
      setRenderTask([]);

      const taskListAfterCategoryDeletion = userTasks.filter(
        (task) => task.category !== category._id
      );
      setUserTasks(taskListAfterCategoryDeletion);
      setActiveCategory(userInfo?.allTaskCategory);

      await axios.delete(
        `${deleteCategoryRoute}/${userInfo._id}/${category._id}`
      );

      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }

  function selectCategory() {
    setActiveCategory(category._id);
    setRes((prev) => !prev);
  }

  function capitalizeCategoryName() {
    return type?.charAt(0).toUpperCase() + type.slice(1);
  }
  return (
    <>
      <Stack
        onClick={selectCategory}
        direction="row"
        sx={{
          backgroundColor:
            activeCategory === category?._id ? "#6f6f6f" : "#232323",
          padding: "0.7em",
          borderRadius: "0.2em",
          justifyContent: "space-between",
          "&:hover": {
            boxShadow: "0 0 1 1",
            cursor: "pointer",
            backgroundColor: "#6f6f6f",
          },
          color: "white",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            color: "white",
          }}
        >
          <IconButton sx={{ color: "#c843ff" }}>
            <LineWeight />
          </IconButton>
          <Typography>{capitalizeCategoryName()}</Typography>
        </Stack>
        <Tooltip title="Delete Category" placement="top">
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={deleteCategory}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
}

export default Category;
