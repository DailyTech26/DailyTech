import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [taskDone, setTaskDone] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setUserData(userDoc.data());
    };
    if (user) fetchUser();
  }, [user]);

  const completeTask = async () => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      tasksCompleted: userData.tasksCompleted + 1,
      rewards: userData.rewards + 10,
    });
    setTaskDone(true);
    setUserData(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      rewards: prev.rewards + 10,
    }));
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      {userData && (
        <>
          <p>Tasks Completed: {userData.tasksCompleted}</p>
          <p>Rewards: {userData.rewards}</p>
          <button onClick={completeTask} disabled={taskDone}>Complete Today’s Task</button>
        </>
      )}
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
