import Task from "./Task";
import { AiOutlineClear } from "react-icons/ai";
import "./styles.scss";

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
  // displaying messages if there is no task
  if (tasks.length === 0) {
    return (
      <div className="tasks">
        <h2 className="headertask">There are no tasks</h2>
      </div>
    );
  }
  return (
    <>
      <h2 className="headertask">These are the tasks:</h2>
      <div className="tasks">
        {/* Renders each task. */}
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onStatusChange={onStatusChange}
            onTaskRemove={onTaskRemove}
          />
        ))}
        {/* Remove Button */}
      </div>
      <div className="cleartask-button">
        <AiOutlineClear onClick={onClearTasks} />
        Clear Tasks
      </div>
    </>
  );
}
export default Tasks;
