import { CardActions, IconButton, Typography } from "@mui/material";
import StyledCard from "../Styled/StyledCard";
import StyledCardContent from "../Styled/StyledCardContent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";
import { useState } from "react";
import StyledConfirmationDialog from "../Styled/StyledConfirmationDialog";
import { useMutation, useQueryClient } from "react-query";
import { deleteActivityGroup } from "../../request/api";
import Link from "next/link";
import Image from "next/image";

type Props = {
  activityGroup: ActivityGroup;
};

const CardActivity = ({ activityGroup }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteActivityGroupMutation = useMutation(deleteActivityGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries("activity-groups");
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = (id: string | undefined) => {
    if (id) {
      deleteActivityGroupMutation.mutate(id);
      setOpen(false);
    }
  };

  return (
    <>
      <StyledCard elevation={0}>
        <StyledCardContent>
          <Link href={`detail/${activityGroup.id}`}>
            <Typography
              fontSize={18}
              fontWeight={700}
              color="text.primary"
              gutterBottom
              sx={{ cursor: "pointer" }}
            >
              {activityGroup.title}
            </Typography>
          </Link>
        </StyledCardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography variant="body2" component={"span"}>
            {moment(activityGroup.created_at).format("DD MMM YYYY")}
          </Typography>
          <IconButton
            aria-label="delete"
            color="default"
            onClick={handleClickOpen}
          >
            <Image
              src={"/icon-delete.svg"}
              width={18}
              height={18}
              alt="Delete"
            />
          </IconButton>
        </CardActions>
      </StyledCard>

      <StyledConfirmationDialog
        handleClose={handleClose}
        handleNo={handleClose}
        handleYes={() => handleYes(activityGroup.id)}
        open={open}
        title={
          <Typography
            variant="body1"
            component={"p"}
            fontSize="18px"
            textAlign="center"
          >
            Apakah anda yakin menghapus activity{" "}
            <strong>{activityGroup.title}</strong>
          </Typography>
        }
      />
    </>
  );
};

export default CardActivity;
