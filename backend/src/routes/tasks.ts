import { Router, Request, Response } from "express";
import { z } from "zod";
import type { Task } from "../types/Task";
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateStatus,
} from "../services/taskService";

const taskRouter = Router();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const updateTaskStatusSchema = z.object({
  status: z.enum(["pending", "done"]),
});

const createTaskHandler = (
  req: Request<{}, Task, z.infer<typeof createTaskSchema>>,
  res: Response<Task | { error: any }>
): void => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const { title, description } = result.data;
  const task = addTask(title, description);
  res.status(201).json(task);
};

const updateTaskStatusHandler = (
  req: Request<{ id: string }, Task, z.infer<typeof updateTaskStatusSchema>>,
  res: Response<Task | { error: any }>
): void => {
  const result = updateTaskStatusSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const { status } = result.data;

  try {
    const updatedTask = updateStatus(Number(req.params.id), status);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
  }
};

taskRouter.get("/", (req, res) => {
  res.json(getAllTasks());
});

taskRouter.post("/", createTaskHandler);

taskRouter.delete("/:id", (req, res) => {
  try {
    deleteTask(Number(req.params.id));
    res.status(200).send();
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});

taskRouter.patch("/:id", updateTaskStatusHandler);

export default taskRouter;
