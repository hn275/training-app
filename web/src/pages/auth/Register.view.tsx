import { Box, Container, TextField, Typography } from "@mui/material";
import Main from "layout/Main";
import { AuthCard } from "./components/Card";

export default function Register() {
  return (
    <Main>
      <AuthCard title="register">
        <Box component="form" display="flex" flexDirection="column" gap={1}>
          <TextField variant="outlined" label="username" required />
          <TextField variant="outlined" label="password" required />
          <TextField variant="outlined" label="confirm password" required />
        </Box>
      </AuthCard>
    </Main>
  );
}
