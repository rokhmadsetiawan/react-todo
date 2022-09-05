import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createTodoItem, updateTodoItem } from "../../request/api";
import { useRouter } from "next/router";
import { PRIORITIES } from "../../constants";

type Props = {
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  todoItem?: TodoItem;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: "24px 30px",
  },

  "& .MuiDialogContent-root": {
    padding: "38px 30px",
  },
  "& .MuiDialogActions-root": {
    padding: "15px 40px 24px",
  },
  "& .MuiPaper-root": {
    boxShadow: "none",
    borderRadius: "12px",
  },
}));

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Typography fontSize={"18px"} fontWeight={600}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 22,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const StyledItemFormDialog = ({
  open,
  handleClose,
  isEdit,
  todoItem,
}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { group_id } = router.query;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<TodoItem>({
    mode: "onChange",
    defaultValues: {
      activity_group_id: group_id,
      title: "",
      priority: "very-high",
    },
  });

  const addItemMutation = useMutation(createTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "activity-groups",
        group_id,
        "todo-items",
      ]);
      reset();
      handleClose();
    },
  });

  const updateItemMutation = useMutation(updateTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "activity-groups",
        group_id,
        "todo-items",
      ]);
      reset();
      handleClose();
    },
  });

  const onSubmit: SubmitHandler<TodoItem> = (data: TodoItem) => {
    if (isEdit && todoItem) {
      updateItemMutation.mutate({ ...data, id: todoItem.id });
    } else {
      addItemMutation.mutate(data);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  React.useEffect(() => {
    if (isEdit && todoItem) {
      setValue("title", todoItem?.title);
      setValue("priority", todoItem?.priority);
    }
  }, []);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BootstrapDialogTitle onClose={handleClose}>
          {isEdit ? "Edit Item" : "Tambah List Item"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack direction="column" marginBottom={"26px"} spacing={1}>
            <Typography variant="caption" component="label" fontWeight={600}>
              NAMA LIST ITEM
            </Typography>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Tambahkan nama activity"
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} maxWidth={"300px"}>
            <Typography variant="caption" component="label" fontWeight={600}>
              PRIORITY
            </Typography>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="demo-multiple-checkbox-label"
                  MenuProps={MenuProps}
                  fullWidth
                  IconComponent={KeyboardArrowUp}
                  {...field}
                >
                  {PRIORITIES.map((priority) => (
                    <MenuItem
                      key={priority.value}
                      value={priority.value}
                      sx={{ paddingY: 1 }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            backgroundColor: priority.color,
                            width: 14,
                            height: 14,
                            borderRadius: 14,
                          }}
                        />
                        <Typography>{priority.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            autoFocus
            color="primary"
            variant="contained"
            disableElevation
            disabled={!isValid}
          >
            {isSubmitting ? <CircularProgress /> : "Simpan"}
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default StyledItemFormDialog;
