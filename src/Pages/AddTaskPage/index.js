import uuid from "react-uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Tasks from "../../components/Tasks";
import Form from "../../components/Form";

function AddTaskPage() {
  const navigate = useNavigate();
  // Sets the initial state.
  const [tasks, setTasks] = useState([]);

  //Removie Task
  const handleRemoveTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  //Change status

  const handleChangeStatus = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
    });
    setTasks(updatedTasks);
  };

  //Deleting Every Tasks
  const handleClearTasks = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(id);
    setTasks(updatedTasks);
  };

  // Adding new tasks
  const handleInputs = (taskname, status) => {
    const newTasks = [...tasks];
    newTasks.push({
      id: uuid(),
      taskname: taskname,
      status: status,
    });
    navigate("/", { state: { mine: taskname } });
    setTasks(newTasks);
    console.log("I am from addpage");
  };

  return (
    <>
      <Tasks
        tasks={tasks}
        onStatusChange={handleChangeStatus}
        onTaskRemove={handleRemoveTask}
        onClearTasks={handleClearTasks}
      />

      <Form onAddTask={handleInputs} />
      {/* <Form /> */}
    </>
  );
}
export default AddTaskPage;
