// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // ✅ Optional: Read user info from Firestore
      const userDocRef = doc(db, "users", loggedInUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      } else {
        console.warn("No user profile found in Firestore.");
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Log In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}
