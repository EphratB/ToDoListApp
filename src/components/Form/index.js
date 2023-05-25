import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import * as database from "./../../database";
//import uuid from "react-uuid";

import "./styles.scss";
import Loader from "../Loader";

function Form({ onAddTask }) {
  const [status, SetStatus] = useState(false);
  const [taskname, SetTaskName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (taskname === "") {
      setErrorMessage("Enter a description.");
    } else {
      // Add the task.
      // const data = {
      //   // id: uuid(),
      //   taskname: taskname,
      //   status: status,
      // };
      setIsSaving(true);
      // we could just do await database.save(data)
      //  Ensure you are using the id returned by firebase instead of generating
      //a random uuid.
      // const saveId = await database.save(data);
      // console.log("savedid", saveId);
      // data.id = saveId;
      // console.log("savedid.data", saveId);
      setIsSaving(false);
      onAddTask(taskname, status);

      // Reset the form state.
      SetTaskName("");
      SetStatus(false);
      setErrorMessage("");

      navigate("/");
    }
  };
  if (isSaving) {
    return (
      <Loader
        className="loading"
        name="Saving your data - one byte at a time, but don't worry, we'll get there!"
      />
    );
  }
  return (
    <>
      <div className="formcontainer">
        <form onSubmit={handleFormSubmit}>
          <h2 className="addtask">Add a new task:</h2>
          {errorMessage !== "" && (
            <div className="erromessage">{errorMessage}</div>
          )}

          <div className="description">
            <label>
              Description:
              <input
                type="text"
                maxLength={150}
                value={taskname}
                onChange={(event) => SetTaskName(event.target.value)}
              />
            </label>
          </div>

          <div className="status">
            <label>
              Status:
              <select
                value={status}
                onChange={(event) => SetStatus(event.target.value)}
              >
                <option value={false}>Open</option>
                <option value={true}>Completed</option>
              </select>
            </label>
          </div>
          <div className="addtaskbutton">
            <button>
              <IoIosAddCircle />
              <label>Add</label>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Form;
