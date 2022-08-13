import { Dialog, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import React, { ComponentType, ReactNode } from "react";

type Props = {
  title: ReactNode;
  open: boolean;
  handleClose: () => void;
  handleYes: () => void;
  handleNo: () => void;
};

const StyledConfirmationDialog = ({
  title,
  open,
  handleYes,
  handleNo,
  handleClose,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      sx={{
        ".MuiDialog-paper": {
          borderRadius: 2,
          maxWidth: "500px",
          padding: 3,
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        pt={3}
        spacing={2}
        direction="column"
      >
        <Image width={84} height={84} alt="delete" src={"/icon-alert.svg"} />
        <>{title}</>
        <Stack direction={"row"} spacing={4} p={2}>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            onClick={handleNo}
            disableElevation
          >
            Batal
          </Button>
          <Button
            size="large"
            variant="contained"
            color="error"
            disableElevation
            onClick={handleYes}
          >
            Hapus
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default StyledConfirmationDialog;
