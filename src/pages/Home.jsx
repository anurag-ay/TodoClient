import React from "react";
import NavBar from "../components/NavBar";
import RightSideBar from "../components/RightSideBar";
import TaskList from "../components/TaskList";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useResponsive } from "../context/responsiveContext";

function Home() {
  const theme = useTheme();
  const query = useMediaQuery(theme.breakpoints.up("sm"));
  const [isRes] = useResponsive();

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: "93.4vh", boxSizing: "border-box" }}>
        {(!isRes || query) && (
          <Grid item xs={12} md={3} sm={3} lg={3}>
            <RightSideBar />
          </Grid>
        )}

        {(isRes || query) && (
          <Grid item flexGrow="1">
            <TaskList />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Home;
