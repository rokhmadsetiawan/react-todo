import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import NavbarActivityDetail from "../../components/activity/NavbarActivityDetail";
import TodoItems from "../../components/activity/TodoItems";
import Layout from "../../components/Layout";
import StyledLoading from "../../components/Styled/StyledLoading";
import { getActivityGroupDetail, getTodoItems } from "../../request/api";

type Props = {};

const Detail = (props: Props) => {
  const route = useRouter();
  const { group_id } = route.query;

  const {
    data: activityGroup,
    isSuccess: isSuccessActivityGroup,
    isLoading: isLoadingActivityGroup,
  } = useQuery(["activity-groups", group_id], () =>
    getActivityGroupDetail(group_id)
  );

  const {
    data: todoItems,
    isSuccess: isSuccessTodoItems,
    isLoading: isLoadingTodoItems,
  } = useQuery(["activity-groups", group_id, "todo-items"], () =>
    getTodoItems(group_id)
  );

  const isLoading = isLoadingTodoItems || isLoadingActivityGroup;

  return (
    <Layout title="TODO LIST APP">
      {isLoading && <StyledLoading />}

      {isSuccessActivityGroup && (
        <NavbarActivityDetail activityGroup={activityGroup} />
      )}
      {isSuccessTodoItems && <TodoItems todoItems={todoItems} />}
    </Layout>
  );
};

export default Detail;
