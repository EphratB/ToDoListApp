import uuid from "react-uuid";
import { useState } from "react";
import Form from "../../components/Form";

export default function FormPage() {
  const [tasks, setTasks] = useState([]);

  // // Adding new tasks
  const handleInputs = (taskname, status) => {
    const newTasks = [...tasks];
    newTasks.push({
      id: uuid(),
      taskname: taskname,
      status: status,
    });
    setTasks(newTasks);
    console.log(newTasks);
  };
  return (
    <div>
      <Form onAddTask={handleInputs} />
    </div>
  );
}
