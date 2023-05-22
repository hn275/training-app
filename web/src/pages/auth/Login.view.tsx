import { Box, FormControl, TextField, Link, Alert, Slide } from "@mui/material";
import { Login as LoginIcon, Email } from "@mui/icons-material";
import Main from "layout/Main";
import { ChangeEvent, useEffect, useState } from "react";
import { AuthCard } from "./components/Card";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "components/Nav/Nav";
import { PasswordInput } from "./components/PasswordInput";
import { firebaseAuth, auth } from "firebase-sdk/auth";
import { useNavigate } from "react-router-dom";
import Bg from "./background.webp";

export default function Login() {
  const {
    username,
    onUsername,
    password,
    onPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <Box display="absolute" top={0} bottom={0} left={0} right={0}>
        <img
          src={Bg}
          style={{ height: "100vh", width: "100%", objectFit: "cover" }}
        />
      </Box>
      <Main>
        <AuthCard title="do the thing.">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ display: "flex", flexFlow: "column", gap: 2 }}>
              <TextField
                label="email"
                value={username}
                onChange={onUsername}
                type="text"
                InputProps={{
                  endAdornment: <Email color="action" />,
                }}
              />

              <PasswordInput
                label="password"
                value={password}
                onChange={onPassword}
              />

              <LoadingButton
                variant="contained"
                sx={{
                  marginX: "auto",
                  width: "max-content",
                }}
                endIcon={<LoginIcon />}
                loading={loading}
                loadingPosition="end"
                type="submit"
              >
                Sign In
              </LoadingButton>
            </FormControl>
          </form>

          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            marginTop={1}
          >
            <Link underline="hover" href={ROUTES.register} fontSize="0.9em">
              Register
            </Link>
          </Box>
        </AuthCard>

        <Slide in={error !== ""} unmountOnExit>
          <Box paddingTop={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        </Slide>
      </Main>
    </>
  );
}

function useLogin() {
  type OnInput = ChangeEvent<HTMLInputElement>;

  const [username, setUsername] = useState<string>("");
  const onUsername = (e: OnInput) => setUsername(() => e.target.value);

  const [password, setPassword] = useState<string>("");
  const onPassword = (e: OnInput) => setPassword(() => e.target.value);

  const [show, setShow] = useState<boolean>(false);
  const onShowToggle = () => setShow((s) => !s);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const id = setTimeout(() => {
      if (error) setError(() => "");
    }, 3000);
    return () => clearTimeout(id);
  }, [error]);

  const nav = useNavigate();
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(() => true);
    try {
      await firebaseAuth.signInWithEmailAndPassword(auth, username, password);
      nav(ROUTES.home);
    } catch (e: any) {
      switch (e.code) {
        case "auth/invalid-email":
          setError(() => "Invalid email.");
          return;
        case "auth/user-not-found":
          setError(() => "User not found.");
          return;
        case "auth/wrong-password":
          setError(() => "Authentication failed.");
          return;
        default:
          console.log(e.code);
          setError(() => "Server isn't responding");
          return;
      }
    } finally {
      setLoading(() => false);
    }
  }

  return {
    username,
    onUsername,
    password,
    onPassword,
    show,
    onShowToggle,
    loading,
    error,
    handleSubmit,
  };
}
