import styles from "./style.module.scss";
import image  from "@/Assets/Images/Welcome.png";
import loadingImage from "@/Assets/Images/loading.gif"

const WelcomePage = () => {
  return (
    <div className={styles.welcome}>
      <img src={image} className={styles.image}/>
      <img src={loadingImage} className={styles.LoadingImage} alt="" />
    </div>
  );
};

export default WelcomePage;