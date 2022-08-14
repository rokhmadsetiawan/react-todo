import {
  Box,
  Button,
  ButtonBase,
  ClickAwayListener,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createActivityGroup,
  deleteActivityGroup,
  updateActivityGroup,
} from "../../request/api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import Link from "next/link";

type Props = {
  activityGroup: ActivityGroup;
};

type EditableTextField = {
  newText: string;
  setNewText: any;
  isTextField: boolean;
  handleClickAway: () => void;
};

const EditableTextField = ({
  isTextField,
  newText,
  setNewText,
  handleClickAway,
}: EditableTextField) => {
  if (isTextField) {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <TextField
          id="outlined-basic"
          variant="standard"
          onChange={(e) => setNewText(e.target.value)}
          value={newText}
          InputProps={{
            sx: {
              fontSize: "34px",
              fontWeight: 700,
            },
          }}
          sx={{
            width: "100%",
            maxWidth: "583px",
          }}
        />
      </ClickAwayListener>
    );
  }

  return (
    <Typography variant="h4" fontWeight={700} component={"h1"}>
      {newText}
    </Typography>
  );
};

const NavbarActivityDetail = ({ activityGroup }: Props) => {
  const [isTextField, setTextField] = useState(false);
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();
  const updateActivityGroupMutation = useMutation(updateActivityGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["activity-groups"]);
    },
  });

  const handleClickAway = () => {
    setTextField(false);
    if (activityGroup) {
      updateActivityGroupMutation.mutate({ id: activityGroup.id, title });
    }
  };

  useEffect(() => {
    setTitle(activityGroup?.title);
  }, [activityGroup]);

  return (
    <Stack direction={"row"} justifyContent={"space-between"} paddingY={5}>
      <Stack direction="row" alignItems="center" gap={"20px"}>
        <Link href="/">
          <ButtonBase aria-label="back" disableRipple disableTouchRipple>
            <Image src={"/icon-back.svg"} width={32} height={32} alt="Back" />
          </ButtonBase>
        </Link>
        <EditableTextField
          newText={title}
          setNewText={setTitle}
          isTextField={isTextField}
          handleClickAway={handleClickAway}
        />
        <ButtonBase
          aria-label="edit"
          disableRipple
          disableTouchRipple
          onClick={(e) => setTextField(!isTextField)}
        >
          <Image src={"/icon-edit.svg"} width={32} height={32} alt="Back" />
        </ButtonBase>
      </Stack>
      <Stack direction={"row"} spacing="18px" alignItems={"center"}>
        <IconButton size="large">
          <Image src={"/icon-sort.svg"} width={24} height={24} alt="Sort" />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<AddIcon />}
        >
          Tambah
        </Button>
      </Stack>
    </Stack>
  );
};

export default NavbarActivityDetail;
