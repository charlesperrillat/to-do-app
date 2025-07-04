import { Task } from "../types/Task";

let tasks: Task[] = [];
let idCounter = 1;

export const getAllTasks = () => tasks;

export const addTask = (title: string, description?: string) => {
  const newTask: Task = {
    id: idCounter++,
    title,
    description: description?.trim() || "",
    status: "pending",
  };

  tasks.push(newTask);
  return newTask;
};

export const deleteTask = (id: number) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) throw new Error("Task not found");
  tasks.splice(index, 1);
};

export const updateStatus = (id: number, status: Task["status"]) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error("Task not found");
  task.status = status;
  return task;
};
