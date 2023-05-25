import uuid from "react-uuid";
import { useState } from "react";
import Tasks from "../../components/Tasks";
//import Form from "../../components/Form";
//import { useNavigate } from "react-router-dom";

export default function HomePage(props) {
  //const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      taskname: "Walk the dog",
      status: true,
    },
    {
      id: uuid(),
      taskname: "Wash the car",
      status: false,
    },
    {
      id: uuid(),
      taskname: "Take out the garbage",
      status: false,
    },
    {
      id: uuid(),
      taskname: "Finish the lab",
      status: true,
    },
  ]);

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

  // // // Adding new tasks

  // const handleInputs = (taskname, status) => {
  //   const newTasks = [...tasks];
  //   newTasks.push({
  //     id: uuid(),
  //     taskname: taskname,
  //     status: status,
  //   });
  //   setTasks(newTasks);
  //   console.log("I am from addpage");
  // };

  return (
    <>
      <Tasks
        tasks={tasks}
        onStatusChange={handleChangeStatus}
        onTaskRemove={handleRemoveTask}
        onClearTasks={handleClearTasks}
      />
    </>
  );
}
