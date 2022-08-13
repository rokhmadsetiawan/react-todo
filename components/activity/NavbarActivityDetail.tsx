import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createActivityGroup } from "../../request/api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import Link from "next/link";
type Props = {
  activityGroup: ActivityGroup;
};

const NavbarActivityDetail = ({ activityGroup }: Props) => {
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
      <Stack direction="row" alignItems="center" gap={"20px"}>
        <Link href="/">
          <ButtonBase aria-label="back" disableRipple disableTouchRipple>
            <Image src={"/icon-back.svg"} width={32} height={32} alt="Back" />
          </ButtonBase>
        </Link>
        <Typography variant="h4" fontWeight={700} component={"h1"}>
          {activityGroup?.title}
        </Typography>
        <ButtonBase aria-label="edit" disableRipple disableTouchRipple>
          <Image src={"/icon-edit.svg"} width={32} height={32} alt="Back" />
        </ButtonBase>
      </Stack>
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

export default NavbarActivityDetail;
