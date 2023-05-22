import { Alert, Box, Link, Slide, TextField, Typography } from "@mui/material";
import Main from "layout/Main";
import { AuthCard } from "./components/Card";
import { Email } from "@mui/icons-material";
import { PasswordInput } from "./components/PasswordInput";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "components/Nav/Nav";
import { ChangeEvent, useEffect, useState } from "react";
import { auth, firebaseAuth } from "firebase-sdk/auth";
import { useNavigate } from "react-router-dom";
import Bg from "./background.webp";

export default function Register() {
  const {
    handleSubmit,
    loading,
    error,
    username,
    onUsername,
    password,
    onPassword,
    confirmPw,
    onConfirmPw,
  } = useRegister();

  return (
    <>
      <Box display="absolute" top={0} bottom={0} left={0} right={0}>
        <img
          src={Bg}
          style={{ height: "100vh", width: "100%", objectFit: "cover" }}
        />
      </Box>
      <Main>
        <AuthCard title="register">
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
          >
            <TextField
              required
              variant="outlined"
              label="email"
              InputProps={{
                endAdornment: <Email color="action" />,
              }}
              value={username}
              onChange={onUsername}
            />

            <PasswordInput
              label="password"
              required
              value={password}
              onChange={onPassword}
            />
            <PasswordInput
              label="confirm password"
              required
              value={confirmPw}
              onChange={onConfirmPw}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ width: "max-content", mx: "auto" }}
            >
              Sign Up
            </LoadingButton>
          </Box>

          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            marginTop={2}
          >
            <Typography fontSize="0.9rem" textAlign="center">
              Already have an account?
              <br />
              <Link underline="hover" href={ROUTES.login} fontSize="0.9em">
                Log In now
              </Link>
            </Typography>
          </Box>
        </AuthCard>
      </Main>

      <Slide in={error !== ""} unmountOnExit>
        <Box padding={2} position="fixed" top={0} left={0} right={0}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Slide>
    </>
  );
}

function useRegister() {
  type OnInput = ChangeEvent<HTMLInputElement>;
  type OnFormSubmit = ChangeEvent<HTMLFormElement>;

  const [username, setUsername] = useState<string>("");
  const onUsername = (e: OnInput) => setUsername(() => e.target.value);

  const [password, setPassword] = useState<string>("");
  const onPassword = (e: OnInput) => setPassword(() => e.target.value);

  const [confirmPw, setConfirmPw] = useState<string>("");
  const onConfirmPw = (e: OnInput) => setConfirmPw(() => e.target.value);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const id = setTimeout(() => setError(() => ""), 5000);
    return () => clearTimeout(id);
  }, [error]);

  const nav = useNavigate();
  async function handleSubmit(e: OnFormSubmit) {
    e.preventDefault();
    if (password !== confirmPw) {
      return setError(() => "Passwords don't match.");
    }

    setLoading(() => true);
    try {
      await firebaseAuth.createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      await firebaseAuth.signOut(auth);
      nav(ROUTES.login);
    } catch (e) {
      switch ((e as any).code as string) {
        case "auth/invalid-email":
          setError(() => "Invalid email");
          return;
        default:
          setError(() => "Something went wrong. Try again later.");
          console.error(e);
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
    confirmPw,
    onConfirmPw,
    handleSubmit,
    loading,
    error,
  };
}
