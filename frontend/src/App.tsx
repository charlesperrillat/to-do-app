import "./App.css";
import Task, { type TaskStatus } from "./components/Task/Task";
import TaskForm from "./components/TaskForm/TaskForm";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks = [],
    isLoading,
    error,
    create,
    remove,
    updateStatus,
  } = useTasks();

  const handleAddTask = (title: string, description?: string) => {
    create.mutate({ title, description });
  };

  const handleDeleteTask = (id: number) => {
    remove.mutate(id);
  };

  const handleToggleTaskStatus = (id: number, newStatus: TaskStatus) => {
    updateStatus.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <main className="flex flex-col items-center gap-4 py-4">
      <h1>To Do List </h1>

      <div>
        <TaskForm onSubmit={handleAddTask} />
      </div>

      {tasks.length === 0 ? (
        <h2>No task</h2>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onToggleStatus={handleToggleTaskStatus}
            onDelete={handleDeleteTask}
          />
        ))
      )}
    </main>
  );
}

export default App;
