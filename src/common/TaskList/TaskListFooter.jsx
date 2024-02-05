import styled from "@emotion/styled";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useUserInfo } from "../../context/userInfoContext";
import axios, { addTaskRoute } from "../../api/api";
import { useUserTasks } from "../../context/userTaskContext";
import { useRenderTask } from "../../context/renderTasksContext";
import { useActiveCategory } from "../../context/activeCategoryContext";
import { useIsProgress } from "../../context/isProgressContext";
import Publish from "@mui/icons-material/Publish";

function TaskListFooter({ taskBodyRef }) {
  const [taskTitle, setTaskTitle] = useState("");

  const userInfo = useUserInfo();
  const [, setAllTasks] = useUserTasks();
  const [, setRenderTask] = useRenderTask();
  const [activeCategory] = useActiveCategory();
  const [, setIsProgress] = useIsProgress();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsProgress(true);
    const container = taskBodyRef.current;
    container.scrollTop = container.scrollHeight;

    if (!userInfo) return;
    if (!taskTitle) return;

    try {
      const payload = {
        title: taskTitle,
        userId: userInfo._id,
        categoryId: activeCategory,
      };
      const res = await axios.post(addTaskRoute, payload);
      const newTask = res.data;
      setRenderTask((prev) => [...prev, newTask]);
      setAllTasks((prev) => [...prev, newTask]);
      setIsProgress(false);
      setTaskTitle("");
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }
  return (
    <Box
      sx={{
        mt: "1em",
        backgroundColor: "#212121",
        opacity: "70%",
      }}
    >
      <Stack component="form" direction="row" onSubmit={handleSubmit}>
        <CustomTextField
          fullWidth
          label="Add New Task"
          variant="filled"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <IconButton type="submit" sx={{ color: "white" }}>
          <Publish />
        </IconButton>
      </Stack>
    </Box>
  );
}

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export default TaskListFooter;
