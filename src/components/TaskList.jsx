import { Box, Grid, LinearProgress, Stack } from "@mui/material";
import React, { useRef } from "react";
import backgroundImage from "../assets/backgroundImages/Background.jpg";
import TaskListHeader from "../common/TaskList/TaskListHeader";
import TaskBody from "../common/TaskList/TaskBody";
import TaskListFooter from "../common/TaskList/TaskListFooter";
import { useActiveCategory } from "../context/activeCategoryContext";
import { useIsProgress } from "../context/isProgressContext";

function TaskList() {
  const [activeCategory] = useActiveCategory();
  const taskBodyRef = useRef();
  const [isProgress] = useIsProgress();

  function isSpecificCategory() {
    if (
      activeCategory === "today" ||
      activeCategory === "important" ||
      activeCategory === "done" ||
      !activeCategory
    )
      return false;
    return true;
  }
  return (
    <>
      <Stack
        sx={{ width: "100%", backgroundColor: "#212121", height: "0.4vh" }}
        spacing={2}
      >
        {isProgress && <LinearProgress color="success" />}
      </Stack>

      <Box
        sx={{
          height: "93.0vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: "2em",
          boxSizing: "border-box",
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <TaskListHeader />
          </Grid>
          <Grid item>
            <TaskBody taskBodyRef={taskBodyRef} />
          </Grid>
          {isSpecificCategory() && (
            <Grid item>
              <TaskListFooter taskBodyRef={taskBodyRef} />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default TaskList;
