import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  AlertTitle,
  Alert,
  Snackbar,
  LinearProgress,
  Slide,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios, { registerUserRoute } from "../api/api";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProgress, setProgress] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setProgress(true);
      if (password !== confirmPassword)
        throw new Error("Password and Confirm password are mismatched");

      const payload = {
        userName,
        firstName,
        lastName,
        password,
      };

      await axios.post(registerUserRoute, payload);
      setUserName("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setProgress(false);
      navigate("/login");
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

  function handleClickLogin() {
    navigate("/login");
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

      <Box
        display={"flex"}
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

        <Box
          display={"flex"}
          flexDirection={"row"}
          height={"80vh"}
          sx={{
            color: "white",
            backgroundColor: "gray",
            boxShadow: "0em 0em  2em #313131",
          }}
        >
          <Stack
            alignItems={"center"}
            direction={"column"}
            spacing={5}
            width={"30vw"}
            height={"80vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            paddingLeft={"2rem"}
            paddingRight={"2rem"}
            sx={{
              backgroundColor: "#000000",
            }}
          >
            <Typography variant="h2">Welcome Back!</Typography>
            <Typography variant="body2">
              To keep connected with us please login With your personal info
            </Typography>

            <Button
              onClick={handleClickLogin}
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
              SIGN IN
            </Button>
          </Stack>
        </Box>

        {/* SignUP */}
        <Box
          color={"black"}
          width={"35vw"}
          height={"80vh"}
          alignItems={"center"}
          sx={{
            border: "2px solid #000000",
            backgroundColor: "white",
            color: "#44D7B6",
            boxShadow: "0em 0em  2em #313131",
          }}
        >
          <Stack direction={"column"} spacing={2} alignItems={"center"} p="1em">
            <Typography variant="h3" color="#0c372d">
              Create Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, color: "#FF4262" }}
            >
              <Grid container columnSpacing="0.5em" rowSpacing="1em">
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="User Name"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6} alignItems={"center"}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Confirm password"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    border: "0.1em solid white",
                    padding: "0.8em",
                    width: "10em",
                    borderRadius: "2em",
                    "&:hover": {
                      color: "white",
                      border: "0.1em solid white",
                      backgroundColor: "#44D7B6",
                      boxShadow:
                        "#44D7B6 0px -23px 25px 0px inset, #44D7B6 0px -36px 30px 0px inset, #44D7B6 0px -79px 40px 0px inset,#44D7B6 0px 2px 1px,#44D7B6 0px 4px 2px, #44D7B6 0px 8px 4px, rgba(0, 0, 0, 0.09)  0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                    },
                  }}
                  variant="outlined"
                >
                  SIGN UP
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
