import { Box, Container } from "@mui/material";
import React, { ReactNode } from "react";
import Header from "./header/Header";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return (
    <Box bgcolor={"#F4F4F4"} minHeight="100vh" paddingBottom={3}>
      <Header title={title} />
      <Container>{children}</Container>
    </Box>
  );
};

export default Layout;
