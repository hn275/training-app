import { ChangeEvent } from "react";

declare global {
  type OnHTMLInput = ChangeEvent<HTMLInputElement>;
}
