import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { text } from "stream/consumers";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ color: "white" }} elevation={0}>
          <Container>
            <Toolbar disableGutters variant="large">
              <Link href="/">
                <Typography
                  variant="h6"
                  component="div"
                  fontWeight={700}
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                >
                  {title}
                </Typography>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
