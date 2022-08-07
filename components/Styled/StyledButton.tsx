import { Button, styled } from "@mui/material";
import React from "react";
import theme from "../../src/theme";

type Props = {};

const StyledButton = styled(Button)({
  color: "white",
  borderRadius: 100,
  textTransform: "none",
  fontWeight: 600,
  fontSize: 18,
});

export default StyledButton;
