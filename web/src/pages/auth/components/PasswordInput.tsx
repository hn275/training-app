import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

export function PasswordInput(props: TextFieldProps) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <ShowPassword show={show} onClick={() => setShow((s) => !s)} />
        ),
      }}
    />
  );
}

interface Props {
  show: boolean;
  onClick: () => void;
}
function ShowPassword({ show, onClick }: Props) {
  return show ? (
    <VisibilityOff
      role="button"
      onClick={onClick}
      cursor="pointer"
      color="action"
    />
  ) : (
    <Visibility
      role="button"
      onClick={onClick}
      cursor="pointer"
      color="action"
    />
  );
}
