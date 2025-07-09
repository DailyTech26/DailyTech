import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null); // null means loading

  // Check if current user is admin
  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  // Load all tasks
  useEffect(() => {
    if (!isAdmin) return;

    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, [isAdmin]);

  const addTask = async () => {
    if (!task.trim()) return alert("Please enter a task");

    try {
      await addDoc(collection(db, "tasks"), {
        task,
        createdAt: new Date(),
        createdBy: user.email
      });
      alert("Task added successfully!");
      setTask("");
    } catch (e) {
      alert("Error adding task: " + e.message);
    }
  };

  // Handle non-admin access
  if (isAdmin === false) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You must be an admin to access this page.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  if (!user || isAdmin === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Logged in as: {user.email}</p>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Upload Task</button>

      <h3 style={{ marginTop: "2rem" }}>All Uploaded Tasks</h3>
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
