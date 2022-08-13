import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../components/header/Header";
import NavbarActivity from "../components/activity/NavbarActivity";
import EmptyActivity from "../components/activity/EmptyActivity";
import ListActivity from "../components/activity/ListActivity";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getActivityGroups } from "../request/api";
import { CircularProgress, Stack } from "@mui/material";
import StyledLoading from "../components/Styled/StyledLoading";
import Layout from "../components/Layout";

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("activity-groups", () => getActivityGroups());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  const {
    data: activityGroups,
    isLoading,
    isSuccess,
  } = useQuery("activity-groups", getActivityGroups);

  return (
    <Layout title="TODO LIST APP">
      <NavbarActivity />
      {isLoading && <StyledLoading />}
      {isSuccess && <ListActivity activityGroups={activityGroups} />}
    </Layout>
  );
};

export default Home;
