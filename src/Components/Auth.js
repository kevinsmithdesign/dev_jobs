import React, { useState } from "react";
import { auth, googleProvider } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Stack,
  IconButton,
  Input,
  FilledInput,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Auth = () => {
  // TODO: Update all these useState to useReducer and create a function called reducer.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  //   const logout = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await signOut(auth);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Optional: set the height of the container to the full viewport height
      }}
    >
      <Card
        sx={{
          boxShadow: 0,
          width: 420,
          maxWidth: 420,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack mb={3}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Email"
              />
            </FormControl>
          </Stack>
          <Stack mb={3}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {error && (
              <Typography color="error">Wrong email or password</Typography>
            )}
          </Stack>
          <Stack mb={1}>
            <Button size="large" variant="outlined" onClick={login}>
              Sign In
            </Button>
          </Stack>
          <Stack mb={2}>
            <Button variant="outlined" size="large" onClick={signInWithGoogle}>
              Sign In with Google
            </Button>
          </Stack>
          <Stack mb={1}>
            <Button size="large" variant="contained" onClick={createAccount}>
              Create Account
            </Button>
          </Stack>

          {/* <button onClick={logout}>Logout</button> */}
        </CardContent>
      </Card>
    </Container>
  );
};
