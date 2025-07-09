
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPanel() {
  const [task, setTask] = useState("");

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        task,
        createdAt: new Date(),
      });
      alert("Task added");
      setTask("");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Upload Task</button>
    </div>
  );
}
