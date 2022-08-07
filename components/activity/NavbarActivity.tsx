import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../Styled/StyledButton";

type Props = {};

const NavbarActivity = (props: Props) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} paddingY={5}>
      <Typography variant="h4" fontWeight={700} component={"h1"}>
        Activity
      </Typography>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<AddIcon />}
      >
        Tambah
      </StyledButton>
    </Stack>
  );
};

export default NavbarActivity;
