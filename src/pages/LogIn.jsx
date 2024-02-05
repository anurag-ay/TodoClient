import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  LinearProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios, { logInRoute } from "../api/api";
import useMediaQuery from "@mui/material/useMediaQuery";

function LogIn() {
  const singInWidth_sm = useMediaQuery("(min-width:414px)");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProgress, setProgress] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(true);
    const payload = {
      userName,
      password,
    };
    try {
      const res = await axios.post(logInRoute, payload);
      if (res.status === 200) {
        const token = res.data;
        localStorage.setItem("token", token);
        setProgress(false);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setProgress(false);
      setIsError(true);
      if (err.name === "AxiosError") {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  function handleClickSignup() {
    navigate("/signup");
  }

  function handleClose(e, reason) {
    if (reason === "clickaway") {
      setIsError(false);
    }
  }
  return (
    <>
      {isProgress && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      )}
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "#212121",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Snackbar
          open={isError}
          autoHideDuration={2000}
          TransitionComponent={Slide}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <Alert severity="error">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        </Snackbar>
        <Stack
          flexDirection="row"
          sx={{
            color: "white",
            boxShadow: "0em 0em  2em #313131",
          }}
        >
          {/* Sign */}
          <Stack
            flex="1 0"
            color={"black"}
            width={"30vw"}
            direction={"column"}
            alignItems={"center"}
            sx={{
              border: "2px solid #000000",
              backgroundColor: "white",
              p: "1em",
            }}
          >
            <Box m="3em">
              <Typography color={"#0c372d"} variant="h3">
                Sign In
              </Typography>
            </Box>
            <Stack justifyContent="center">
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: "1.8em" }}
              >
                <Grid container gap="1em">
                  <Grid item xs={12}>
                    <TextField
                      name="userName"
                      label="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      fullWidth
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Stack alignItems="center">
                  <Button
                    type="submit"
                    sx={{
                      mt: "1em",
                      color: "white",
                      backgroundColor: "#0c372d",
                      padding: "0.8em",
                      width: "10em",
                      borderRadius: "2em",
                      "&:hover": {
                        color: "white",
                        border: "0.1em solid white",
                        boxShadow:
                          "#44D7B6 0px -23px 25px 0px inset, #44D7B6 0px -36px 30px 0px inset, #44D7B6 0px -79px 40px 0px inset,#44D7B6 0px 2px 1px,#44D7B6 0px 4px 2px, #44D7B6 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                      },
                    }}
                    variant="outlined"
                  >
                    SIGN IN
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>

          {/* Welcome Screen */}
          {singInWidth_sm && (
            <Box
              width={"30vw"}
              height={"80vh"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              paddingLeft={"2rem"}
              paddingRight={"2rem"}
              sx={{
                backgroundColor: "#000000",
              }}
            >
              <Stack alignItems={"center"} direction={"column"} spacing={5}>
                <Typography variant="h2">Hello, Friend!</Typography>
                <Typography variant="body2">
                  Enter your personal details and start Journey with us
                </Typography>

                <Button
                  onClick={handleClickSignup}
                  sx={{
                    color: "white",
                    backgroundColor: "#44D7B6",
                    border: "0.1em solid white",
                    padding: "0.8em",
                    width: "10em",
                    borderRadius: "2em",
                    "&:hover": {
                      color: "#44D7B6",
                      border: "0.1em solid white",
                      backgroundColor: "#44D7B6",
                      boxShadow:
                        "white 0px -23px 25px 0px inset, white 0px -36px 30px 0px inset, white 0px -79px 40px 0px inset,white 0px 2px 1px,#44D7B6 0px 4px 2px, white 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                    },
                  }}
                  variant="outlined"
                >
                  SIGN UP
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default LogIn;
