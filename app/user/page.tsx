"use client";
import { useEffect, useState } from "react";
import UserDetails from "../components/user/UserDetails";
import { useUserApi } from "../context/User/UserContext";
import styles from "./page.module.scss";
import LoginUser from "../components/user/LoginUser/LoginUser";
const UserPage: React.FC = () => {
  const { getUser } = useUserApi();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        setData(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    if (!currentUser) {
      console.log("ovde");
      fetchData();
    } else {
      console.log("nekim cudom ovde");
      setData(currentUser);
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        "LOADING"
      ) : data ? (
        <UserDetails props={data} />
      ) : (
        <LoginUser />
      )}
    </div>
  );
};

export default UserPage;
