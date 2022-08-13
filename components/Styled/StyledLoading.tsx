import { CircularProgress, Stack } from "@mui/material";
import React from "react";

type Props = {};

const StyledLoading = (props: Props) => {
  return (
    <Stack
      width={"100%"}
      height="50vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Stack>
  );
};

export default StyledLoading;
