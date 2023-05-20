import { Box, Container, colors } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <Box bgcolor={colors.blueGrey[50]} minHeight="100vh">
      <Container component="main">{children}</Container>
    </Box>
  );
}
