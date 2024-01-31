import NavBarComponent from "./components/navBar/NavBarComponent";
import styles from "./page.module.scss";

const Home: React.FC = async () => {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h1>Vozdrica</h1>
        <p>Demo FE za PHP projekat</p>
      </section>
    </div>
  );
};

export default Home;
