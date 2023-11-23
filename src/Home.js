import {  useState } from "react";

import ToDoList from "./ToDoList"; // Adjust the path if needed


const Home = () => {
  const [body, setBody] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleData = async (e) => {
    e.preventDefault();
    const task = { body };

    try {
      const response = await fetch("http://localhost:8000/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Clear the input field after successfully adding the task
      setBody("");

      // Update the key to trigger a re-render of ToDoList
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="home">
      <form className="form" onSubmit={handleData}>
        <input
          type="text"
          placeholder="Task"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="submit" type="submit">Submit</button>
      </form>
      <ToDoList key={refreshKey} />
    </div>
  );
};

export default Home;
