import { Box, FormControl, TextField, Link, Alert, Slide } from "@mui/material";
import { Person, Login as LoginIcon } from "@mui/icons-material";
import Main from "layout/Main";
import { ChangeEvent, useEffect, useState } from "react";
import { AuthCard } from "./components/Card";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "mods/Nav";
import { PasswordInput } from "./components/PasswordInput";

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
    <Main>
      <AuthCard title="do the thing.">
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ display: "flex", flexFlow: "column", gap: 2 }}>
            <Box
              display="flex"
              justifyItems="center"
              alignItems="center"
              gap={2}
            >
              <Person sx={{ marginTop: 2 }} color="action" />
              <TextField
                label="username"
                variant="standard"
                value={username}
                onChange={onUsername}
                type="text"
              />
            </Box>

            <PasswordInput
              label="password"
              value={password}
              onChange={onPassword}
            />

            <LoadingButton
              variant="contained"
              sx={{
                boxShadow: "none",
                marginTop: 2,
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

        <Box width="100%" display="flex" justifyContent="center" marginTop={1}>
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

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(() => true);
    try {
      const data = await mockFetch(username, password);
      console.log(data);
    } catch (e) {
      setError(() => "Server isn't responding");
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

function mockFetch(username: string, password: string, willErr = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willErr) return reject("Some error");
      resolve({ username, password });
    }, 1000);
  });
}
