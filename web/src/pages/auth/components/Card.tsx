import { CardContent, Card, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title: string;
}

export function AuthCard({ children, title }: CardProps) {
  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: "0px 3px 5px rgba(0,0,0,0.05)",
        width: "max-content",
        padding: "1rem",
      }}
    >
      <CardContent>
        <Typography
          component="h1"
          fontSize="1.3rem"
          fontWeight={500}
          color="primary.main"
          marginBottom={2}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
