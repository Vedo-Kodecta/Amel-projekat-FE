import NavBarComponent from "./components/navBar/NavBarComponent";
import styles from "./page.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavBarComponent />
      <section className={styles.content}>
        <h1>Vozdra</h1>
        <p>Demo FE za PHP projekat</p>
      </section>
    </div>
  );
};

export default Home;
