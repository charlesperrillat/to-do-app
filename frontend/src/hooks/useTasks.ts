import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "../services/taskService";
import type { TaskStatus } from "../components/Task/Task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const create = useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description?: string;
    }) => createTask(title, description),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      updateTaskStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return { tasks, isLoading, error, create, remove, updateStatus };
};
