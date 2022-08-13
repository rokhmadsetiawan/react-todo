import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createActivityGroup } from "../../request/api";

type Props = {};

const NavbarActivity = (props: Props) => {
  const queryClient = useQueryClient();

  const addActivityGroupMutation = useMutation(createActivityGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("activity-groups");
    },
  });

  const onClick = () => {
    addActivityGroupMutation.mutate();
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"} paddingY={5}>
      <Typography variant="h4" fontWeight={700} component={"h1"}>
        Activity
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        Tambah
      </Button>
    </Stack>
  );
};

export default NavbarActivity;
