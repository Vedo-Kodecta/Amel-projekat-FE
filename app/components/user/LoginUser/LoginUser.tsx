"use client";
import React, { useState } from "react";
import styles from "./LoginUser.module.scss";
import RegisterUser from "../RegisterUser/RegisterUser";
import { useUserApi } from "@/app/context/User/UserContext";

const LoginUser: React.FC<any> = ({ props }) => {
  const { login } = useUserApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async () => {
    const { success, error } = await login(email, password);
    if (success) {
      window.location.href = "/user";
    }
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div className={styles.loginContainer}>
      {showRegister ? (
        <RegisterUser
          onRegister={handleSwitchToLogin}
          onSwitchToLogin={handleSwitchToLogin}
        />
      ) : (
        <>
          <h1>Login User</h1>
          <form className={styles.loginForm}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email:</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Password:</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <p onClick={handleSwitchToRegister}>New user? Register here</p>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginUser;
