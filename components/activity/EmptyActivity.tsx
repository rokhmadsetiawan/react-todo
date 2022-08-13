import { Box, Button, ButtonBase, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createActivityGroup } from "../../request/api";

type Props = {};

const EmptyActivity = (_props: Props) => {
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
    <Stack alignItems={"center"} justifyContent="center">
      <ButtonBase onClick={onClick} disableRipple disableTouchRipple>
        <Box sx={{ position: "relative", width: 768, height: 490 }}>
          <Image
            src={"/activity-empty-state.png"}
            layout="fill"
            alt="Activity empty"
          />
        </Box>
      </ButtonBase>
    </Stack>
  );
};

export default EmptyActivity;
