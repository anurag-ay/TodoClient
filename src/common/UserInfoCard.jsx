import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserInfo } from "../context/userInfoContext";
import { PowerSettingsNew } from "@mui/icons-material";

function UserInfoCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const userInfo = useUserInfo();

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if (!userInfo) return;
    const { firstName, lastName, userName } = userInfo;
    setFirstName(firstName);
    setLastName(lastName);
    setUserName(userName);
  }, [userInfo]);
  return (
    <Stack
      direction="row"
      sx={{
        p: "0.5em",
        alignItems: "center",
        backgroundColor: "#212121",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row">
        <Avatar />
        <Stack direction="column" sx={{ ml: "1em", color: "white" }}>
          <Typography>{`${firstName} ${lastName}`}</Typography>
          <Typography>{`@${userName}`}</Typography>
        </Stack>
      </Stack>
      <Tooltip title="Logout" placement="top-end">
        <IconButton sx={{ color: "red" }} onClick={logout}>
          <PowerSettingsNew />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default UserInfoCard;
