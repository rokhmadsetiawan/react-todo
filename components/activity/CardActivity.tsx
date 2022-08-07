import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import StyledCard from "../Styled/StyledCard";
import StyledCardContent from "../Styled/StyledCardContent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";
type Props = {};

const CardActivity = (_props: Props) => {
  return (
    <StyledCard elevation={0}>
      <StyledCardContent>
        <Typography
          fontSize={18}
          fontWeight={700}
          color="text.primary"
          gutterBottom
        >
          Daftar Belanja Bulanan
        </Typography>
      </StyledCardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography variant="body2" component={"span"}>
          1 Oktober 2022
        </Typography>
        <IconButton aria-label="delete" color="default">
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

export default CardActivity;
