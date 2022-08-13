import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import NavbarActivityDetail from "../../components/activity/NavbarActivityDetail";
import Layout from "../../components/Layout";
import { getActivityGroupDetail } from "../../request/api";

type Props = {};

const Detail = (props: Props) => {
  const route = useRouter();
  const { group_id } = route.query;

  const { data: activityGroup, error } = useQuery(
    ["activity-groups", group_id],
    () => getActivityGroupDetail(group_id)
  );

  return (
    <Layout title="TODO LIST APP">
      <NavbarActivityDetail activityGroup={activityGroup} />
    </Layout>
  );
};

export default Detail;
