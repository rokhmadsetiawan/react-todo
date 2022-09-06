import {
  Button,
  ButtonBase,
  ClickAwayListener,
  IconButton,
  Menu,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getActivityGroupDetail, updateActivityGroup } from "../../request/api";
import Image from "next/image";
import Link from "next/link";
import StyledItemFormDialog from "../Styled/StyledItemFormDialog";
import StyledSortMenuItem from "../Styled/StyledSortMenuItem";

type Props = {
  activityGroup: ActivityGroup;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
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
    <Typography
      variant="h4"
      fontWeight={700}
      component={"h1"}
      data-cy="todo-title"
    >
      {newText}
    </Typography>
  );
};

const NavbarActivityDetail = ({
  activityGroup,
  orderBy,
  setOrderBy,
}: Props) => {
  const [isTextField, setTextField] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openSort = Boolean(anchorEl);

  const handleClickSort = (sort: string) => {
    setAnchorEl(null);
    setOrderBy(sort);
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} paddingY={5}>
        <Stack direction="row" alignItems="center" gap={"20px"}>
          <Link href="/">
            <ButtonBase
              aria-label="back"
              disableRipple
              disableTouchRipple
              data-cy="todo-back-button"
            >
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
            data-cy="todo-title-edit-button"
          >
            <Image src={"/icon-edit.svg"} width={32} height={32} alt="Back" />
          </ButtonBase>
        </Stack>
        <Stack direction={"row"} spacing="18px" alignItems={"center"}>
          <IconButton
            size="large"
            aria-controls={openSort ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openSort ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            data-cy="todo-sort-button"
          >
            <Image src={"/icon-sort.svg"} width={24} height={24} alt="Sort" />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            data-cy="todo-add-button"
          >
            Tambah
          </Button>
        </Stack>
      </Stack>

      {/* dialog */}
      <StyledItemFormDialog
        open={open}
        handleClose={handleClose}
        isEdit={false}
      />

      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSort}
        onClose={handleClickSort}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ marginTop: "16px" }}
      >
        <StyledSortMenuItem
          handleClick={() => handleClickSort("newest")}
          title="Terbaru"
          image="/icon-sort-newest.svg"
          checked={orderBy === "newest"}
          data-cy="sort-selection"
        />
        <StyledSortMenuItem
          handleClick={() => handleClickSort("oldest")}
          title="Terlama"
          image="/icon-sort-oldest.svg"
          checked={orderBy === "oldest"}
          data-cy="sort-selection"
        />
        <StyledSortMenuItem
          handleClick={() => handleClickSort("ascending")}
          title="A-Z"
          image="/icon-sort-a.svg"
          checked={orderBy === "ascending"}
          data-cy="sort-selection"
        />
        <StyledSortMenuItem
          handleClick={() => handleClickSort("descending")}
          title="Z-A"
          image="/icon-sort-d.svg"
          checked={orderBy === "descending"}
          data-cy="sort-selection"
        />
        <StyledSortMenuItem
          handleClick={() => handleClickSort("active")}
          title="Belum Selesai"
          image="/icon-sort-active.svg"
          checked={orderBy === "active"}
          data-cy="sort-selection"
        />
      </Menu>
    </>
  );
};

export default NavbarActivityDetail;
