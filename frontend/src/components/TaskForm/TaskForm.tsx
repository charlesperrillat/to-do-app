import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskForm.module.css";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type TaskFormSchema = z.infer<typeof taskSchema>;

export interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormSchema>({ resolver: zodResolver(taskSchema) });

  const submit = (data: TaskFormSchema) => {
    onSubmit(data.title.trim(), data.description?.trim() || undefined);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={styles.inputSection}>
        <input type="text" {...register("title")} placeholder="Title" />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div className={styles.inputSection}>
        <input
          type="text"
          {...register("description")}
          placeholder="Description"
        />
      </div>
      <button type="submit" className={styles.button}>
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
