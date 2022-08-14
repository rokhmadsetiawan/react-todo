import { Box, Button, ButtonBase, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createActivityGroup } from "../../request/api";

type Props = {};

const EmptyTodoList = (_props: Props) => {
  const onClick = () => {
    console.log("on click");
  };

  return (
    <Stack alignItems={"center"} justifyContent="center" py={5}>
      <ButtonBase onClick={onClick} disableRipple disableTouchRipple>
        <Box sx={{ position: "relative", width: 541, height: 413 }}>
          <Image src={"/empty-item.png"} layout="fill" alt="List empty" />
        </Box>
      </ButtonBase>
    </Stack>
  );
};

export default EmptyTodoList;
