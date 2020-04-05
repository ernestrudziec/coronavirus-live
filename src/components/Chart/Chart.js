import React, {useEffect, useState} from 'react';
import styles from './Chart.module.scss';
import Chart from 'chart.js';
import ReactDOM from "react-dom";
import useWindowDimensions from "../windowSize/windowSize";





const BarChart = (props) => {

    let { height, width } = useWindowDimensions();

    const [data, setData] = useState([]);
    let [chartRef, setChartRef] = useState(React.createRef());
    let [screenSize, setScreenSize] = useState({h: height, w: width});






    useEffect(() => {
    console.log(height + " -h:w- " + width);
    console.log(screenSize.h + " -h:w- " + screenSize.w);
    }, []);

    useEffect(() => {
        if(props.data.length === 16)setData(props.data);
        console.log(data);
    }, [props.data]);






useEffect(() => {

    let isMobile = () => {
        if(screenSize.w < 700){
            return true;
        }
        else{
            return false;
        }


    }

let showLabels = () => {

    let labels = [];

    console.log(isMobile());

    if (!isMobile()) {
        data.map((region, i) => {

            labels.push(region.jpt_nazwa_);
        });
    }
    else {

        data.map((region, i) => {

            if (i < 3) {
                labels.push(region.jpt_nazwa_);
            }
        });

    }


     return labels;


}

        setChartRef = new Chart(chartRef.current, {


            type: 'bar',
            responsive: true,
            maintainAspectRatio: false,
            options: {
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            fontSize: 15,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            drawBorder: true,
                        },
                        ticks: {
                            beginAtZero: true,
                            fontSize: 15,
                            maxTicksLimit: 5,
                            padding: 0,
                        }
                    }]
                }
            },
            data: {
                labels: showLabels(),
                datasets: [{
                    label: "Potwierdzone przypadki",
                    data: data.map(region => region.SUM_Confirmed),
                    backgroundColor: '#c21807'
                }]
            }
        });


    }, [data]);

    return (
<div className={styles.wrapper}>
        <canvas className={styles.myCanvas} ref={chartRef}/>
</div>
    );
};

export default BarChart;