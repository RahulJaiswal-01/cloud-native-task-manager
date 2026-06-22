import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onDelete,
  onStatusChange
}) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;