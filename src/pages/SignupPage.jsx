// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      // Create user doc in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        isAdmin: false,
        tasksCompleted: 0,
        rewards: 0,
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // If already logged in, redirect
  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Create Account</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Already have an account? <a href="/">Login here</a></p>
    </div>
  );
}
