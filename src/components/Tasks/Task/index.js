import "./styles.scss";
import * as database from "./../../../database";

import { BsToggleOn, BsPinAngle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task({ task, onStatusChange, onTaskRemove }) {
  async function handleChangeStatus() {
    const id = task.id;

    // Get the current status of the task
    const currentStatus = task.status;

    // Toggle the status (i.e., if it's currently "open", set it to "completed" and vice versa)
    const newStatus = currentStatus ? false : true;

    // Create the data object to update the task status
    const data = { status: newStatus };

    // Update the task in the database
    const updated = await database.update(id, data);
    console.log(data);
    console.log(id);

    console.log("updated successfully", updated);
    onStatusChange(id);
  }

  // remove the task from the database
  async function handleRemoveTask() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      const removed = await database.remove(task.id);

      if (removed) {
        // remove from memory
        onTaskRemove(task.id);
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task.");
      }
    }
  }

  return (
    <>
      <div className="task">
        <BsPinAngle />
        <div className="task-name">{task.taskname}</div>
        <div>{task.id}</div>
        <div className={`task-status ${task.status ? "completed" : "open"}`}>
          {task.status ? "Completed" : "Open"}
        </div>

        {/* <p>{status}</p> */}
        <div className="icons">
          <BsToggleOn onClick={handleChangeStatus} />
          Change status
          <BiTrash onClick={handleRemoveTask} />
          <label className="removetask">Remove Task</label>
        </div>
      </div>
    </>
  );
}
export default Task;
