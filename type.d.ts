type ActivityGroup = {
  id?: string;
  title: string;
  email?: string;
  created_at?: string;
};

type TodoItem = {
  activity_group_id?: string;
  title: string;
  is_active?: number;
  priority?: string;
};
