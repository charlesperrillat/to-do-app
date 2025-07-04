import apiUrl from "./api";
import type { TaskStatus } from "../components/Task/Task";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await apiUrl.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (
  title: string,
  description?: string
): Promise<Task> => {
  const res = await apiUrl.post<Task>("/tasks", { title, description });
  return res.data;
};

export const updateTaskStatus = async (
  id: number,
  status: TaskStatus
): Promise<Task> => {
  const res = await apiUrl.patch<Task>(`/tasks/${id}`, { status });
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiUrl.delete(`/tasks/${id}`);
};
