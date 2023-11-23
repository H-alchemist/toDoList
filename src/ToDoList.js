import UseFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const { data } = UseFetch("http://localhost:8000/tasks");
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);

  useEffect(() => {
    console.log("Count:", deletedTaskIds.length);
    console.log("Data:", data);
  }, [deletedTaskIds, data]);

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: "DELETE",
      });

      // Update the deletedTaskIds to trigger a re-render
      setDeletedTaskIds((prevIds) => [...prevIds, taskId]);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  return (
    <div>
      {data &&
        data
          .filter((task) => !deletedTaskIds.includes(task.id))
          .map((task) => (
            <div className="todoL" key={task.id}>
              <div>{task.body}</div>
              <button onClick={() => handleDelete(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
    </div>
  );
};

export default ToDoList;
