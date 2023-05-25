//import uuid from "react-uuid";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
import Footer from "./components/Footer/footer";
import Loader from "./components/Loader";
import HelpPage from "./Pages/HelpPage";
import HelpAddTaskPage from "./Pages/HelpPage/helpAddTaskPage";
import HelpChangeTaskPage from "./Pages/HelpPage/helpChangeTaskPage";
import HelpRemoveTaskPage from "./Pages/HelpPage/helpRemoveTaskPage";
import HelpIntroductionPage from "./Pages/HelpPage/introduction";
import PageNotFound from "./Pages/PageNotFound";
import * as database from "./database";
import { db } from "./database/config";
import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // load the database

    // IIFE immediately Invoked fucntion expression

    (async () => {
      const data = await database.load();
      console.log("Loading database", data);
      //seting data from database
      setTasks(data);
      setIsLoading(false);
    })();
  }, []);

  // Sets the initial state.

  //Remove Task
  const handleRemoveTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    console.log(id);
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

  //Deleting Every Tasks from database
  const handleClearTasks = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collection?"
    );

    if (confirmDelete) {
      const taskCollection = collection(db, "tasks");
      const querySnapshot = await getDocs(taskCollection);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
        setTasks([]);
      });
    } else {
      // handle user cancel
      console.log("Collection deletion cancelled");
    }
  };

  // //Adding new tasks
  const handleInputs = async (taskname, status) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        taskname: taskname,
        status: status,
      });

      const newTask = {
        id: docRef.id,
        taskname: taskname,
        status: status,
      };

      const newTasks = [...tasks];
      newTasks.push(newTask);

      setTasks(newTasks);
      console.log(newTasks, "from App.js");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader
          className="loadingComponent"
          name="Your content is loading faster than a cheetah!!!"
        />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                tasks={tasks}
                onStatusChange={handleChangeStatus}
                onTaskRemove={handleRemoveTask}
                onClearTasks={handleClearTasks}
              />
            }
          />

          <Route path="/add" element={<Form onAddTask={handleInputs} />} />

          <Route path="/help" element={<HelpPage />}>
            <Route path="" element={<HelpIntroductionPage />} />
            <Route path="addtask" element={<HelpAddTaskPage />} />
            <Route path="removetask" element={<HelpRemoveTaskPage />} />
            <Route path="changetask" element={<HelpChangeTaskPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}

      {/* <Tasks
        tasks={tasks}
        onStatusChange={handleChangeStatus}
        onTaskRemove={handleRemoveTask}
        onClearTasks={handleClearTasks}
      /> */}

      {/* <Form onAddTask={handleInputs} /> */}

      <Footer />
    </>
  );
}
export default App;
