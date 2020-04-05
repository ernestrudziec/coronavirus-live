import React from "react";
import WebScraping from "../../components/WebScraping/WebScraping";
import styles from './Homepage.module.scss';

const Homepage = () => {


    return(
      <div className={styles.wrapper}>

       <WebScraping/>

       <footer className={styles.footer}>
        <p><b>autor:</b> Ernest Rudziec</p>
           <p><b>e-mail:</b> ernest.rudziec@gmail.com</p>
        <p><b>dane:</b> arcgis / who</p>
       </footer>

      </div>
    );
}


export default Homepage;