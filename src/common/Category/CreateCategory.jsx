import styled from "@emotion/styled";
import { Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios, { addCategoryRoute } from "../../api/api";
import { useUserInfo } from "../../context/userInfoContext";
import { useUserCategory } from "../../context/userCategoryContext";
import { useActiveCategory } from "../../context/activeCategoryContext";
import { useIsProgress } from "../../context/isProgressContext";

function CreateCategory({
  setIsClickCreateNewCategory,
  categoryRef,
  setFocus,
  isFocus,
  setErrorMessage,
  setIsError,
}) {
  const [type, setType] = useState("");
  const userInfo = useUserInfo();
  const [, setUserCategory] = useUserCategory();
  const [, setActiveCategory] = useActiveCategory();
  const createCategoryRef = useRef();
  const [, setIsProgress] = useIsProgress();

  const handleClickAway = (event) => {
    if (
      createCategoryRef.current &&
      !createCategoryRef.current.contains(event.target)
    ) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);

    return () => document.removeEventListener("mousedown", handleClickAway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createCategory(e) {
    e.preventDefault();
    setIsProgress(true);
    const container = categoryRef.current;
    container.scrollTop = container.scrollHeight;
    if (!userInfo) return;
    if (!type) return;

    const payload = {
      type,
      userId: userInfo._id,
    };
    try {
      const res = await axios.post(addCategoryRoute, payload);
      const newCategory = res.data;
      setUserCategory((prev) => [...prev, newCategory]);
      setActiveCategory(newCategory._id);
      setIsClickCreateNewCategory(false);
      setIsProgress(false);
    } catch (err) {
      setIsProgress(false);
      setIsError(true);

      if (err.name === "AxiosError") {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage(err.message);
      }
    }
  }

  return (
    <>
      {isFocus && (
        <Stack
          ref={createCategoryRef}
          direction="row"
          sx={{
            backgroundColor: "#212121",
            borderRadius: "0.2em",
            color: "white",
          }}
        >
          <Stack
            direction="row"
            component="form"
            onSubmit={createCategory}
            sx={{ flexGrow: "1" }}
          >
            <SideBarTextField
              fullWidth
              autoFocus
              color="secondary"
              onChange={(e) => setType(e.target.value)}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}

const SideBarTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    color: "white",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "520",
    borderColor: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
  },

  "&:hover": {
    borderColor: "#d4dee0",
  },
}));

export default CreateCategory;
