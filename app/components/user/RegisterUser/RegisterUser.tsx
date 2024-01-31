// RegisterUser.js

import React, { useState } from "react";
import styles from "./RegisterUser.module.scss";

const RegisterUser: React.FC<any> = ({ onRegister, onSwitchToLogin }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log("New Username:", newUsername);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", newPassword);
    onRegister();
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register User</h1>
      <form className={styles.registerForm}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>New Email:</label>
          <input
            className={styles.input}
            type="email"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>New Password:</label>
          <input
            className={styles.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Confirm Password:</label>
          <input
            className={styles.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
      <p onClick={onSwitchToLogin}>Already existing user? Login here</p>
    </div>
  );
};

export default RegisterUser;
