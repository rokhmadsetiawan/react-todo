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
import { PRIORITIES } from "../../constants";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodoItem, updateTodoItem } from "../../request/api";
import { useRouter } from "next/router";
import StyledItemFormDialog from "../Styled/StyledItemFormDialog";

type TodoItemsProps = {
  todoItems?: TodoItem[];
};

type TodoItemProps = {
  todoItem: TodoItem;
};

const generatePriorityColor = (priority: string) => {};

const TodoItem = ({ todoItem }: TodoItemProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { group_id } = router.query;

  const deleteTodoItemMutation = useMutation(deleteTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "activity-groups",
        group_id,
        "todo-items",
      ]);

      setOpenDeleteDialog(false);
    },
  });

  const updateTodoItemMutation = useMutation(updateTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "activity-groups",
        group_id,
        "todo-items",
      ]);
    },
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleYes = ({ id }: TodoItem) => {
    if (id) {
      deleteTodoItemMutation.mutate(id);
    }
  };

  const onChange = (todoItem: TodoItem) => {
    updateTodoItemMutation.mutate({
      ...todoItem,
      is_active: todoItem.is_active == 1 ? 0 : 1,
    });
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  return (
    <Box data-cy="todo-item">
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
          <Checkbox
            {...label}
            checked={todoItem.is_active == 1}
            onChange={() => onChange(todoItem)}
            data-cy="todo-item-checkbox"
          />
          <Box
            sx={{
              background: PRIORITIES.find((p) => p.value === todoItem.priority)
                ?.color,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
            }}
            data-cy="todo-item-priority-indicator"
          />

          <Typography
            variant="h6"
            component={"p"}
            fontSize="18px"
            fontWeight={600}
            className={todoItem.is_active == 1 ? "todo-done" : "null"}
            data-cy="todo-item-title"
          >
            {todoItem?.title}
          </Typography>
          <ButtonBase
            aria-label="edit"
            disableRipple
            disableTouchRipple
            onClick={handleEdit}
            data-cy="todo-item-edit-button"
          >
            <Image src={"/icon-edit.svg"} width={20} height={20} alt="Edit" />
          </ButtonBase>
        </Stack>

        <IconButton
          aria-label="delete"
          color="default"
          onClick={handleClickOpen}
          data-cy="todo-item-delete-button"
        >
          <Image src={"/icon-delete.svg"} width={18} height={18} alt="Delete" />
        </IconButton>
      </Stack>

      {openDeleteDialog && (
        <StyledConfirmationDialog
          handleClose={handleCloseDeleteDialog}
          handleNo={handleCloseDeleteDialog}
          handleYes={() => handleYes(todoItem)}
          open={openDeleteDialog}
          dataCy="todo-modal-delete"
          title={
            <Typography
              variant="body1"
              component={"p"}
              fontSize="18px"
              textAlign="center"
            >
              Apakah anda yakin menghapus item{" "}
              <strong> {todoItem?.title}</strong>
            </Typography>
          }
        />
      )}

      {openEditDialog && (
        <StyledItemFormDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          isEdit={true}
          todoItem={todoItem}
        />
      )}
    </Box>
  );
};

const TodoItems = ({ todoItems }: TodoItemsProps) => {
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
