"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./context/Product/ProductContext";
import NavBarComponent from "./components/navBar/NavBarComponent";
import styles from "./layout.module.scss";
import { UserProvider } from "./context/User/UserContext";
import { useEffect } from "react";
import { setBearerToken } from "./context/User/api";
import { StateMachineProvider } from "./context/StateMachine/StateMachineContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken");
    setBearerToken(storedToken);
  }, []);

  return (
    <UserProvider>
      <ProductProvider>
        <StateMachineProvider>
          <html lang="en">
            <body className={styles.container}>
              <NavBarComponent />
              {children}
            </body>
          </html>
        </StateMachineProvider>
      </ProductProvider>
    </UserProvider>
  );
}
