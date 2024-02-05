import React, { useState } from "react";
import { Sort } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useActiveCategory } from "../../context/activeCategoryContext";
import { useUserCategory } from "../../context/userCategoryContext";
import { useUserInfo } from "../../context/userInfoContext";
import { useRenderTask } from "../../context/renderTasksContext";
import formatDate from "../../utils/formatDate";

function TaskListHeader() {
  const [activeCategory] = useActiveCategory();
  const [categories] = useUserCategory();
  const userInfo = useUserInfo();
  const [renderTask, setRenderTask] = useRenderTask();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function currentCategory() {
    if (activeCategory === "today") {
      return "Today";
    } else if (activeCategory === "important") {
      return "Important";
    } else if (activeCategory === "done") {
      return "Done";
    } else if (activeCategory === userInfo?.allTaskCategory) {
      return "Todo";
    } else {
      const name = categories?.find(
        (category) => category._id === activeCategory
      )?.type;

      const format = name?.charAt(0).toUpperCase() + name?.slice(1);

      return format ? format : "";
    }
  }

  function sortByLatest() {
    setAnchorEl(null);
    const latest = renderTask?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateB - dateA;
    });
    setRenderTask([]);
    setRenderTask([...latest]);
  }

  function sortByOldest() {
    setAnchorEl(null);
    const oldest = renderTask?.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA - dateB;
    });
    setRenderTask([]);
    setRenderTask([...oldest]);
  }

  return (
    <Stack sx={{ mb: "1em" }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", color: "white" }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "2em", color: "black", fontWeight: "700" }}
        >
          {currentCategory()}
        </Typography>

        <Tooltip title="Sort">
          <IconButton onClick={handleClick} sx={{ color: "black" }}>
            <Sort />
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={sortByLatest}>Latest</MenuItem>
          <MenuItem onClick={sortByOldest}>Oldest</MenuItem>
        </Menu>
      </Stack>
      {activeCategory === "today" && (
        <Typography variant="body1" color="white">
          {formatDate(new Date())}
        </Typography>
      )}
    </Stack>
  );
}

export default TaskListHeader;
