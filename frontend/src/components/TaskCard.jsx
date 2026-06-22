function TaskCard({
  task,
  onDelete,
  onStatusChange
}) {
  return (
    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <select
        value={task.status}
        onChange={(e) =>
          onStatusChange(
            task.id,
            e.target.value
          )
        }
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <br />
      <br />

      <button
        onClick={() =>
          onDelete(task.id)
        }
      >
        Delete
      </button>

    </div>
  );
}

export default TaskCard;