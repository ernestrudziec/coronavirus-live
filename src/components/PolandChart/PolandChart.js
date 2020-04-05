
import styles from './PolandChart.module.scss';
import React, {useEffect, useState} from 'react';
import BarChart from "../Chart/Chart";


const PolandChart = props => {

    const [polandRegions, setPolandRegions] = useState([]);

    useEffect(() => {
        setPolandRegions(props.polandRegions);

    }, [props.polandRegions, polandRegions]);




        return(
            <>
            <section className={styles.wrapper}>

                <BarChart data={props.polandRegions}/>

            </section>
                </>
        )


}

export default PolandChart;