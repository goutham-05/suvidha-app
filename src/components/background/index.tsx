import React from "react";
import styles from "./index.module.css"
import backgroundImage from "../../assets/backgroundImage.png"

const BackgroundImage = () => {
    return (
        <img className={styles.bottomImage} src={backgroundImage} alt={""}></img>
    )
}

export default BackgroundImage;