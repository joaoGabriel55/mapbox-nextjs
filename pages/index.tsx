import type { NextPage } from "next";
import MapView from "../src/components/MapView";
import Footer from "../src/components/shared/Footer";
import AppHeader from "../src/components/shared/Header";
import { useChampionshipMarkers } from "../src/hooks/useChampionshipMarkers";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const markers = useChampionshipMarkers();

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <MapView markers={markers} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
