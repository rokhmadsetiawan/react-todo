import { Box, MenuItem, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {
  handleClick: () => void;
  image: string;
  title: string;
  checked: boolean;
};

const StyledSortMenuItem = ({ handleClick, image, title, checked }: Props) => {
  return (
    <MenuItem
      onClick={handleClick}
      sx={{ padding: "14px 21px", width: "233px" }}
    >
      <Stack
        direction="row"
        spacing={"15px"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Image src={image} width={24} height={24} alt={title} />
        <span>{title}</span>
        {checked && (
          <Box
            sx={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Image src={"/icon-check.svg"} width={13} height={10} alt="Sort" />
          </Box>
        )}
      </Stack>
    </MenuItem>
  );
};

export default StyledSortMenuItem;
