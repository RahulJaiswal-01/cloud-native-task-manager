import { useEffect, useState } from "react";

import api from "./services/api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    await api.post("/tasks", task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, {
      status,
    });

    fetchTasks();
  };

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div className="container">
      <h1>📋 Cloud Native Task Manager
</h1>

      <TaskForm onAddTask={addTask} />

      <div className="board">

        <div className="column">
          <h2>Pending</h2>

          <TaskList
            tasks={pendingTasks}
            onDelete={deleteTask}
            onStatusChange={updateStatus}
          />
        </div>

        <div className="column">
          <h2>In Progress</h2>

          <TaskList
            tasks={progressTasks}
            onDelete={deleteTask}
            onStatusChange={updateStatus}
          />
        </div>

        <div className="column">
          <h2>Completed</h2>

          <TaskList
            tasks={completedTasks}
            onDelete={deleteTask}
            onStatusChange={updateStatus}
          />
        </div>

      </div>
      <footer>
  Built by Rahul Jaiswal
</footer>
    </div>
  );
}

export default App;