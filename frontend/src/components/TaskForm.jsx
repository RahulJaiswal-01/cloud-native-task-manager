import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onAddTask({
      title,
      description,
      status: "Pending",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;