import {
  Alert,
  AlertTitle,
  Divider,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import UserInfoCard from "../common/UserInfoCard";
import ImportantCategory from "../common/Category/ImportantCategory";
import TodayCategory from "../common/Category/TodayCategory";
import { Add } from "@mui/icons-material";
import AllTaskCategory from "../common/Category/AllTaskCategory";
import DoneTaskCategory from "../common/Category/DoneTaskCategory";
import CreateCategory from "../common/Category/CreateCategory";
import Category from "../common/Category/Category";
import { useUserCategory } from "../context/userCategoryContext";

function RightSideBar() {
  const [isClickCreateNewCategory, setIsClickCreateNewCategory] =
    useState(false);
  const [categories] = useUserCategory();
  const [isFocus, setFocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const categoryRef = useRef();

  function handleCreateCategory() {
    setFocus(true);
    setIsClickCreateNewCategory(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setIsError(false);
    }
  };

  return (
    <Stack
      ref={categoryRef}
      sx={{
        height: "93.4vh",
        backgroundColor: "#212121",
        padding: "0.3em",
        overflowY: "scroll",
        boxSizing: "border-box",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={1}>
        <UserInfoCard />
        <Divider sx={{ backgroundColor: "#606060" }} />

        <AllTaskCategory />

        <TodayCategory />
        <ImportantCategory />
        <DoneTaskCategory />

        <Divider sx={{ backgroundColor: "#606060" }} />

        {categories &&
          categories.map((category, index) => (
            <Category category={category} key={index} />
          ))}

        {isClickCreateNewCategory && (
          <CreateCategory
            setErrorMessage={setErrorMessage}
            setIsError={setIsError}
            isFocus={isFocus}
            setFocus={setFocus}
            categoryRef={categoryRef}
            setIsClickCreateNewCategory={setIsClickCreateNewCategory}
          />
        )}
      </Stack>

      {/* Add New Category Button */}
      <Stack
        direction="row"
        onClick={handleCreateCategory}
        sx={{
          color: "white",
          borderRadius: "0.3em",
          p: "1em",
          mt: "0.4em",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Add />
        <Typography sx={{ ml: "0.5em", fontWeight: "400" }}>
          Add new category
        </Typography>
      </Stack>

      <Snackbar
        TransitionComponent={Slide}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={isError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity="error">
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default RightSideBar;
