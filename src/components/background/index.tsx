import React from "react";
import styles from "./index.module.css";
import BgImg from "../../assets/bgimg.png";
const BackgroundImage = () => {
    return (
        <img className={styles.bottomImage} src={BgImg} alt={""}></img>
    )
}

export default BackgroundImage