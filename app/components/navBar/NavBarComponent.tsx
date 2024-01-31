import React, { useState } from "react";
import NextLink from "next/link";
import styles from "./NavBarComponent.module.scss";

const NavBarComponent: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logoText}>
          <NextLink href="/">Vedo</NextLink>
        </li>
        <li
          className={styles.dropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NextLink href="/products">Products</NextLink>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <NextLink href="/products">All products</NextLink>
              </li>
              <li>
                <NextLink href="/products/create">Create product</NextLink>
              </li>
              <li>
                <NextLink href="/product-type/create">
                  Create product type
                </NextLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NextLink href="/user">User</NextLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarComponent;
