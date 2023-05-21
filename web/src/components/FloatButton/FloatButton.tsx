import { Box, Fab } from "@mui/material";
import { ReactNode } from "react";

interface FloatButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export function FloatButton({ onClick, children }: FloatButtonProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "4.4rem",
        right: "1rem",
        zIndex: 999,
      }}
    >
      <Fab color="primary" onClick={onClick}>
        {children}
      </Fab>
    </Box>
  );
}
