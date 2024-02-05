import {
  CalendarMonth,
  Delete,
  Edit,
  Publish,
  StarOutlineOutlined,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import {
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios, { deleteTaskRoute, updateTaskRoute } from "../../api/api";
import { useUserInfo } from "../../context/userInfoContext";
import { useRenderTask } from "../../context/renderTasksContext";
import { useUserTasks } from "../../context/userTaskContext";
import { useIsProgress } from "../../context/isProgressContext";
import formatDate from "../../utils/formatDate";
import styled from "@emotion/styled";

function Task({ task }) {
  const [renderTask, setRenderTask] = useRenderTask();
  const [userTasks, setUserTasks] = useUserTasks();
  const userInfo = useUserInfo();
  const [, setIsProgress] = useIsProgress();
  const { title, isDone, updatedAt, isImportant } = task;

  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState("");

  const editTaskRef = useRef();

  const handleClickAway = (event) => {
    if (editTaskRef.current && !editTaskRef.current.contains(event.target)) {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);

    return () => document.removeEventListener("mousedown", handleClickAway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleTaskStatusChange(e) {
    const { _id, title, user, note, isImportant, category } = task;
    setIsProgress(true);
    const payload = {
      _id,
      title,
      user,
      note,
      isDone: e.target.checked,
      isImportant,
      category,
    };
    try {
      const doneTaskInUserList = userTasks.map((task) => {
        if (task._id === _id) {
          return { ...task, isDone: !isDone };
        }
        return task;
      });
      setUserTasks(doneTaskInUserList);

      const notDoneListRender = renderTask.filter((task) => task._id !== _id);
      setRenderTask(notDoneListRender);

      await axios.put(updateTaskRoute, payload);

      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }

  async function markImportant() {
    setIsProgress(true);

    const { _id, title, user, note, isDone, isImportant, category } = task;

    const markImportantTasks = userTasks.map((task) => {
      if (task._id === _id) {
        return { ...task, isImportant: !isImportant };
      }
      return task;
    });
    setUserTasks(markImportantTasks);

    const payload = {
      _id,
      title,
      user,
      note,
      isDone,
      isImportant: !isImportant,
      category,
    };
    try {
      await axios.put(updateTaskRoute, payload);
      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }

  async function deleteTask() {
    if (!userInfo) return;
    setIsProgress(true);

    try {
      const taskListAfterDeletionInRender = renderTask.filter(
        (filterTask) => filterTask._id !== task._id
      );

      setRenderTask(taskListAfterDeletionInRender);

      const taskListAfterDeletionInUserTask = userTasks.filter(
        (filterTask) => filterTask._id !== task._id
      );

      setUserTasks(taskListAfterDeletionInUserTask);

      await axios.delete(
        `${deleteTaskRoute}/${userInfo._id}/${userInfo.allTaskCategory}/${task._id}`
      );

      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }

  async function editTask(e) {
    e.preventDefault();
    if (!editedText) return;
    setIsProgress(true);

    const { _id, user, note, isImportant, category } = task;
    const payload = {
      _id,
      title: editedText,
      user,
      note,
      isDone,
      isImportant,
      category,
    };
    const editedTaskListForUserTask = userTasks.map((task) => {
      if (task._id === _id) {
        return { ...task, title: editedText };
      }
      return task;
    });
    setUserTasks(editedTaskListForUserTask);

    const editedTaskListRenderTask = renderTask.map((task) => {
      if (task._id === _id) {
        return { ...task, title: editedText };
      }
      return task;
    });
    setRenderTask(editedTaskListRenderTask);
    setEditedText("");
    setIsEdit(false);

    try {
      await axios.put(updateTaskRoute, payload);
      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      console.log(err);
    }
  }

  function handleIdEdit() {
    setIsEdit((prev) => !prev);
    setEditedText(title);
  }

  return (
    <Stack
      sx={{
        backgroundColor: "#212121",
        color: "white",
        borderRadius: "0.2em",
        opacity: "87%",
        "&:hover": {
          opacity: "100%",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", flexGrow: "1" }}>
          <Checkbox
            sx={{ color: "white" }}
            onChange={handleTaskStatusChange}
            checked={isDone}
          />
          {isEdit && (
            <Stack
              ref={editTaskRef}
              direction="row"
              onSubmit={editTask}
              sx={{ flexGrow: "1" }}
              component="form"
            >
              <TaskEditTextField
                fullWidth
                autoFocus
                color="secondary"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <IconButton type="submit" sx={{ color: "white" }}>
                <Publish />
              </IconButton>
            </Stack>
          )}
          {!isEdit && (
            <Typography ml="0.6em">
              {isDone ? <s>{title}</s> : title}
            </Typography>
          )}
        </Stack>

        <Stack direction="row">
          <IconButton sx={{ color: "white" }} onClick={handleIdEdit}>
            <Edit />
          </IconButton>
          <Tooltip enterDelay={2000} title="Delete Task" placement="top">
            <IconButton onClick={deleteTask} sx={{ color: "white" }}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip enterDelay={1000} title="Mark Important" placement="top">
            <IconButton onClick={markImportant}>
              {isImportant ? (
                <StarIcon sx={{ color: "yellow" }} />
              ) : (
                <StarOutlineOutlined sx={{ color: "white" }} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {isDone && (
        <Stack
          direction="row"
          sx={{
            p: "0.2em",
            pt: "0",
            alignItems: "center",
          }}
        >
          <CalendarMonth
            sx={{ width: "0.6em", height: "0.6em", mb: "0.11em", ml: "0.2em" }}
          />
          <Typography sx={{ fontSize: "0.8em", ml: "0.2em", fontWeight: "50" }}>
            {`Completed on ${formatDate(new Date(updatedAt))}`}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

const TaskEditTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    color: "white",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "520",
    borderColor: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: 0,
      borderColor: "#E0E3E7",
    },
  },

  "&:hover": {
    borderColor: "#d4dee0",
  },
}));
export default Task;
