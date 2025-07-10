// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null = loading
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check if user is admin
  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setIsAdmin(userSnap.data().isAdmin || false);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  // Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(list);
    };

    fetchTasks();
  }, []);

  // Admin adds a task
  const addTask = async () => {
    if (!task.trim()) return alert("Please enter a task");
    try {
      await addDoc(collection(db, "tasks"), {
        task,
        createdAt: new Date(),
        createdBy: user.email
      });
      alert("Task added!");
      setTask("");
    } catch (e) {
      alert("Error adding task: " + e.message);
    }
  };

  if (!user || isAdmin === null) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}</p>

      {isAdmin && (
        <div>
          <h3>Add a New Task</h3>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Upload Task</button>
        </div>
      )}

      <h3>Task List</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.task} — {t.createdBy}</li>
        ))}
      </ul>

      <br />
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
