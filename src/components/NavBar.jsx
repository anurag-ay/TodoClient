import { ArrowCircleLeft, DoneOutlineSharp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useResponsive } from "../context/responsiveContext";

function NavBar() {
  const theme = useTheme();
  const query = useMediaQuery(theme.breakpoints.down("sm"));
  const [, setRes] = useResponsive();

  function back() {
    setRes((prev) => !prev);
  }

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#212121" }} position="static">
        <Toolbar variant="dense">
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: "1",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <IconButton sx={{ color: "#4aaaef" }}>
                <DoneOutlineSharp sx={{ height: "0.9em", width: "0.9em" }} />
              </IconButton>
              <Typography sx={{ ml: "0.3em", fontSize: "0.9em" }}>
                Task Manager
              </Typography>
            </Stack>

            {query && (
              <IconButton onClick={back} sx={{ color: "white" }}>
                <ArrowCircleLeft />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
