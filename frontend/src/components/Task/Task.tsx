import styles from "./Task.module.css";
import { IoTrashBin } from "react-icons/io5";

export type TaskStatus = "pending" | "done";

export interface TaskProps {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  onToggleStatus?: (id: number, newStatus: TaskStatus) => void;
  onDelete?: (id: number) => void;
}

const Task = ({
  id,
  title,
  description,
  status,
  onToggleStatus,
  onDelete,
}: TaskProps) => {
  const toggleStatus = () => {
    const newStatus = status === "pending" ? "done" : "pending";
    onToggleStatus?.(id, newStatus);
  };

  return (
    <div
      className={`${styles.taskItem} ${
        status === "done" ? styles.taskDone : styles.taskPending
      }`}
    >
      <input
        type="checkbox"
        name="task-status"
        checked={status === "done"}
        onChange={toggleStatus}
        className={styles.taskCheckbox}
      />
      <div className={styles.taskItemCenterPart}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <button onClick={() => onDelete?.(id)}>
        <IoTrashBin />
      </button>
    </div>
  );
};

export default Task;
