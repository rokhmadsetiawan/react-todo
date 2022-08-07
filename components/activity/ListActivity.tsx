import { Grid } from "@mui/material";
import React from "react";
import CardActivity from "./CardActivity";

type Props = {};

const ListActivity = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CardActivity />
      </Grid>
      <Grid item xs={3}>
        <CardActivity />
      </Grid>
      <Grid item xs={3}>
        <CardActivity />
      </Grid>
      <Grid item xs={3}>
        <CardActivity />
      </Grid>
    </Grid>
  );
};

export default ListActivity;
