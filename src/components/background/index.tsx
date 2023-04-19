import React from "react";
import styles from "./index.module.css"
import backgroundImage from "../../assets/backgroundImage.jpg"

const BackgroundImage = () => {
    return (
        <img className={styles.bottomImage} src={backgroundImage} alt={""}></img>
    )
}

export default BackgroundImage