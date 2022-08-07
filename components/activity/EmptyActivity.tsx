import { Box, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

const EmptyActivity = (_props: Props) => {
  return (
    <Stack alignItems={"center"} justifyContent="center">
      <Box sx={{ position: "relative", width: 768, height: 490 }}>
        <Image
          src={"/activity-empty-state.png"}
          layout="fill"
          alt="Activity empty"
        />
      </Box>
    </Stack>
  );
};

export default EmptyActivity;
