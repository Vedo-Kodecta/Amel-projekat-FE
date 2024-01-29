import NextLink from "next/link";
import styles from "./NavBarComponent.module.scss";

const NavBarComponent: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logoText}>Vedo</li>
        <li>
          <NextLink href="/products">Products</NextLink>
        </li>
        <li>
          <NextLink href="/user">User</NextLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarComponent;
