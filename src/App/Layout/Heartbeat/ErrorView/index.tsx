import { FC } from "react";

import { IErrorViewProps } from "./types";

export const ErrorView: FC<IErrorViewProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <p style={{ color: "red" }}>{error}</p>;
};
