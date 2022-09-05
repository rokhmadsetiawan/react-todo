import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import NavbarActivityDetail from "../../components/activity/NavbarActivityDetail";
import TodoItems from "../../components/activity/TodoItems";
import Layout from "../../components/Layout";
import StyledLoading from "../../components/Styled/StyledLoading";
import { getActivityGroupDetail, getTodoItems } from "../../request/api";
import _ from "lodash";

type Props = {};

const Detail = (props: Props) => {
  const route = useRouter();
  const { group_id } = route.query;
  const [orderBy, setOrderBy] = useState("newest");

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
  } = useQuery(
    ["activity-groups", group_id, "todo-items"],
    () => getTodoItems(group_id),
    {
      select: (response) => {
        switch (orderBy) {
          case "newest":
            return _.orderBy(response, ["id"], ["desc"]);

          case "oldest":
            return _.orderBy(response, ["id"], ["asc"]);

          case "ascending":
            return _.orderBy(response, ["title"], ["asc"]);

          case "descending":
            return _.orderBy(response, ["title"], ["desc"]);

          case "active":
            return _.orderBy(response, ["is_active"], ["asc"]);

          default:
            return _.orderBy(response, ["id"], ["desc"]);
        }
      },
    }
  );

  const isLoading = isLoadingTodoItems || isLoadingActivityGroup;

  return (
    <Layout title="TODO LIST APP">
      {isLoading && <StyledLoading />}

      {isSuccessActivityGroup && (
        <NavbarActivityDetail
          activityGroup={activityGroup}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      )}
      {isSuccessTodoItems && <TodoItems todoItems={todoItems} />}
    </Layout>
  );
};

export default Detail;
