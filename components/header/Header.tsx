import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { text } from "stream/consumers";

type Props = {};

const Header = (_props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ color: "white" }} elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              sx={{ flexGrow: 1 }}
            >
              TODO LIST APP
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
