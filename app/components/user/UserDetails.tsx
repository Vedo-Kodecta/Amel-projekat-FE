// UserDetails.tsx
import React from "react";
import styles from "./UserDetails.module.scss";
import { useUserApi } from "@/app/context/User/UserContext";

const UserDetails: React.FC<{ props: User }> = ({ props }) => {
  const { logout } = useUserApi();
  const checkRole = (role: number) => {
    if (role === 1) {
      return "Customer";
    } else if (role === 2) {
      return "Admin";
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.userDetailsContainer}>
      <h1>User Info</h1>
      <p className={styles.userInfo}>Name: {props.name}</p>
      <p className={styles.userInfo}>Email: {props.email}</p>
      <p className={styles.userInfo}>Role: {checkRole(props.user_role_id)}</p>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserDetails;
