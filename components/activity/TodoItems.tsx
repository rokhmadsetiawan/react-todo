import {
  Box,
  ButtonBase,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { blue, green, orange, purple, red } from "@mui/material/colors";
import Image from "next/image";
import React, { useState } from "react";
import StyledConfirmationDialog from "../Styled/StyledConfirmationDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmptyTodoList from "./EmptyTodoList";

type TodoItemsProps = {
  todoItems?: TodoItem[];
};

type TodoItemProps = {
  todoItem: TodoItem;
};

const priority = [
  {
    value: "very-high",
    color: red[500],
    label: "Very High",
  },
  {
    value: "yellow",
    color: orange[500],
    label: "High",
  },
  { value: "medium", color: green[500], label: "Medium" },
  {
    value: "low",
    color: blue[500],
    label: "low",
  },
  {
    value: "very-low",
    color: purple[500],
    label: "Very Low",
  },
];

const generatePriorityColor = (priority: string) => {};

const TodoItem = ({ todoItem }: TodoItemProps) => {
  const [open, setOpen] = useState(false);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
      setOpen(false);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "28px",
          width: "100%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgb(0 0 0 / 15%)",
        }}
      >
        <Stack direction={"row"} alignItems="center" spacing={"16px"}>
          <Checkbox {...label} checked={todoItem.is_active == 1} />
          <Box
            sx={{
              background: priority.find((p) => p.value === todoItem.priority)
                ?.color,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
            }}
          />

          <Typography
            variant="h6"
            component={"p"}
            fontSize="18px"
            fontWeight={600}
          >
            {todoItem?.title}
          </Typography>
          <ButtonBase
            aria-label="edit"
            disableRipple
            disableTouchRipple
            onClick={(e) => console.log("edit")}
          >
            <Image src={"/icon-edit.svg"} width={20} height={20} alt="Edit" />
          </ButtonBase>
        </Stack>

        <IconButton
          aria-label="delete"
          color="default"
          onClick={handleClickOpen}
        >
          <Image src={"/icon-delete.svg"} width={18} height={18} alt="Delete" />
        </IconButton>
      </Stack>
      <StyledConfirmationDialog
        handleClose={handleClose}
        handleNo={handleClose}
        handleYes={() => handleYes(1)}
        open={open}
        title={
          <Typography
            variant="body1"
            component={"p"}
            fontSize="18px"
            textAlign="center"
          >
            Apakah anda yakin menghapus item <strong> {todoItem?.title}</strong>
          </Typography>
        }
      />
    </Box>
  );
};

const TodoItems = ({ todoItems }: TodoItemsProps) => {
  console.log("todoItems", todoItems);
  if (todoItems?.length === 0) {
    return <EmptyTodoList />;
  }

  return (
    <Stack spacing={"10px"}>
      {todoItems?.map((todoItem) => (
        <TodoItem todoItem={todoItem} key={todoItem.id} />
      ))}
    </Stack>
  );
};

export default TodoItems;
