import { Box, Link, TextField, Typography } from "@mui/material";
import Main from "layout/Main";
import { AuthCard } from "./components/Card";
import { Person } from "@mui/icons-material";
import { PasswordInput } from "./components/PasswordInput";
import { LoadingButton } from "@mui/lab";
import { ROUTES } from "mods/Nav";

export default function Register() {
  return (
    <Main>
      <AuthCard title="register">
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            variant="outlined"
            label="username"
            required
            InputProps={{
              endAdornment: <Person />,
            }}
          />

          <PasswordInput label="password" required />
          <PasswordInput label="confirm password" required />

          <LoadingButton variant="contained">Sign Up</LoadingButton>
        </Box>

        <Box width="100%" display="flex" justifyContent="center" marginTop={2}>
          <Typography fontSize="0.9rem" textAlign="center">
            Already have an account?
            <br />
            <Link underline="hover" href={ROUTES.register} fontSize="0.9em">
              Log In now
            </Link>
          </Typography>
        </Box>
      </AuthCard>
    </Main>
  );
}
