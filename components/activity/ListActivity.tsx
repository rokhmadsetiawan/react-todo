import { Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import CardActivity from "./CardActivity";
import EmptyActivity from "./EmptyActivity";

type Props = {
  activityGroups: ActivityGroup[];
};

const ListActivity = ({ activityGroups }: Props) => {
  if (activityGroups.length === 0) {
    return <EmptyActivity />;
  }

  return (
    <Grid container spacing={2}>
      {activityGroups?.map((activityGroup: ActivityGroup) => (
        <Grid item xs={3} key={activityGroup.id}>
          <CardActivity activityGroup={activityGroup} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListActivity;
