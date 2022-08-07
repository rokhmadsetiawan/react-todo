import styled from "@emotion/styled";
import { Card } from "@mui/material";

const StyledCard = styled(Card)({
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: "12px",
  padding: "22px 28px",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
  },
});

export default StyledCard;
