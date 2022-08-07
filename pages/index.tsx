import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../components/header/Header";
import NavbarActivity from "../components/activity/NavbarActivity";
import EmptyActivity from "../components/activity/EmptyActivity";
import ListActivity from "../components/activity/ListActivity";

const Home: NextPage = () => {
  return (
    <Box bgcolor={"#F4F4F4"} minHeight="100vh">
      <Header />
      <Container>
        <NavbarActivity />
        <ListActivity />
        {/* <EmptyActivity /> */}
      </Container>
    </Box>
  );
};

export default Home;
