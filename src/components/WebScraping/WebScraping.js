
import React from "react";
import styles from './WebScraping.module.scss';
import PolandChart from "../PolandChart/PolandChart";




let html = null;

const urlTotalDeaths = 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true';
const urlTotalCases = 'https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true';
const urlTotalCountries = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=177&cacheHint=true';

class WebScraping extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            lastUpdate: null,
            confirmed: null,
            deaths: null,
            recovered: null,
            dailyDeaths: null,
            dailyCases: null,
            polandRegions: [],
            totalCases: null,
            totalDeaths: null,
            totalRecovered: null,
            totalCountriesArray: [],
            lastUpdatedObject: new Date(),
        };


    }


    fetchPoland =  async () => {

        fetch("https://services1.arcgis.com/YmCK8KfESHdxUQgm/arcgis/rest/services/KoronawirusPolska_czas_widok/FeatureServer/0/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Aktualizacja%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true&fbclid=IwAR0YggKYOqHI7wlSxqoeKUwUNSPU1-Yym1uV1Kx_wcMb-Ys0JaA3TYkpHtY", {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {
                // console.log(json.features[json.features.length-1].attributes);

                console.log("lastUpdated: " + json.features[json.features.length-1].attributes.Aktualizacja);
                this.setState({lastUpdated: json.features[json.features.length-1].attributes.Aktualizacja,
                    lastUpdatedObject: new Date(json.features[json.features.length-1].attributes.Aktualizacja)});


                // console.log("confPoland: " + json.features[json.features.length-1].attributes.Potwierdzone);
                this.setState({confirmed: json.features[json.features.length-1].attributes.Potwierdzone});
                // console.log("deathsPoland: " + json.features[json.features.length-1].attributes.Smiertelne);
                this.setState({deaths: json.features[json.features.length-1].attributes.Smiertelne});

                // console.log("dailyConfPoland: " + json.features[json.features.length-1].attributes.Dziennie_potwierdzone);
                this.setState({dailyCases: json.features[json.features.length-1].attributes.Dziennie_potwierdzone});
                // console.log("dailyDeathsPoland: " + json.features[json.features.length-1].attributes.Dziennie_śmiertelne);
                this.setState({dailyDeaths: json.features[json.features.length-1].attributes.Dziennie_śmiertelne});

            });

    }

    fetchPolandRegions =  async () => {

        fetch("https://services1.arcgis.com/YmCK8KfESHdxUQgm/arcgis/rest/services/wojewodztwa_corona_widok/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=SUM_Confirmed%20desc&resultOffset=0&resultRecordCount=25&cacheHint=true", {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {

                json.features.map( region => {
                    // console.log(region.attributes);
                    // console.log(region.attributes.jpt_nazwa_.toUpperCase());

                    this.setState({
                        polandRegions: [ ...this.state.polandRegions, region.attributes ]

                    })



                })

            });



    }

    fetchTotalRecovered =  async () => {

        fetch("https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true", {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {

                this.setState({totalRecovered: json.features[0].attributes.value});
                // console.log("Total Recovered: " + this.state.totalRecovered);
            });

        // json.features.map( region => {
        //     console.log(region.attributes);
        //     // console.log(region.attributes.jpt_nazwa_.toUpperCase());
        //
        //     // this.setState({
        //     //     polandRegions: [ ...this.state.polandRegions, region.attributes ]
        //     //
        //     // })
        //
        //
        //
        // })
        // });



    }

    fetchTotalDeaths =  async () => {

        fetch(  urlTotalDeaths, {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {
                this.setState({totalDeaths: json.features[0].attributes.value});
                // console.log("Total Deaths: " + this.state.totalDeaths);
            });

        // json.features.map( region => {
        //     console.log(region.attributes);
        //     // console.log(region.attributes.jpt_nazwa_.toUpperCase());
        //
        //     // this.setState({
        //     //     polandRegions: [ ...this.state.polandRegions, region.attributes ]
        //     //
        //     // })
        //
        //
        //
        // })
        // });



    }

    fetchTotalCases =  async () => {

        fetch(  urlTotalCases, {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {

                this.setState({totalCases: json.features[0].attributes.value});
                // console.log("Total Cases: " + this.state.totalCases);
            });


        // json.features.map( region => {
        //     console.log(region.attributes);
        //     // console.log(region.attributes.jpt_nazwa_.toUpperCase());
        //
        //     // this.setState({
        //     //     polandRegions: [ ...this.state.polandRegions, region.attributes ]
        //     //
        //     // })
        //
        //
        //
        // })
        // });



    }

    fetchTotalCountries =  async () => {

        fetch(  urlTotalCountries, {
            "method": "GET",
            headers: {
                "Accept": "application/json"
            }

        })
            .then(response => response.json())
            .then(json => {


                // console.log("PL World Rank (Most Cases): " + json.features.findIndex(where => {
                //     return where.attributes.Country_Region === 'Poland';
                // })   );

                json.features.map( (countries, index ) => {

                    // console.log(region.attributes.jpt_nazwa_.toUpperCase());

                    this.setState({
                        totalCountriesArray: [ ...this.state.totalCountriesArray, countries.attributes]

                    });
                })

                // console.log("recoveredPoland: " + json.features[json.features.findIndex(where => {
                //     return where.attributes.Country_Region === 'Poland';
                // })].attributes.Recovered);

                this.setState({
                        recovered: json.features[json.features.findIndex(where => {
                            return where.attributes.Country_Region === 'Poland';
                        })].attributes.Recovered,

                    }

                );




            })


        // json.features.map( region => {
        //     console.log(region.attributes);
        //     // console.log(region.attributes.jpt_nazwa_.toUpperCase());
        //
        //     // this.setState({
        //     //     polandRegions: [ ...this.state.polandRegions, region.attributes ]
        //     //
        //     // })
        //
        //
        //
        // })
        // });



    }

    numberParse = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    Round = (n, k) => {
        let factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    }






    async componentDidMount() {

        await this.fetchTotalCountries();
        await this.fetchPoland();
        await this.fetchPolandRegions();
        await this.fetchTotalDeaths();
        await this.fetchTotalRecovered();
        await this.fetchTotalCases();





        //wszystkie kraje
        //https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=177&cacheHint=true


        //wojewodztwa
        // https://services1.arcgis.com/YmCK8KfESHdxUQgm/arcgis/rest/services/wojewodztwa_corona_widok/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=SUM_Confirmed%20desc&resultOffset=0&resultRecordCount=25&cacheHint=true

        //all cases
        //https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true










    }


    render(){

        return(
            <>
                <div className={styles.totalWrapper}>

                    <div className={styles.mainWrapper}>
                        <header> <caption className={styles.websiteTitle}><b>koronawirus</b>-live.pl<figure className={styles.animatedCircle}/></caption> <b> Dane o SARS-CoV-2</b> W Polsce i na Świecie na żywo  </header>
                        <div className={styles.polandWrapper}>

                            <div className={styles.polandCasesWrapper}>
                                <label>Przypadki w Polsce:</label>
                                <data>{this.state.confirmed}</data>
                            </div>


                            <div className={styles.polandDaily}>

                                <div className={styles.dailyDeaths}>
                                    <label>ZMARŁO DZISIAJ: </label>
                                    <data>{this.state.dailyDeaths === null ?  + '0' : '+' + this.state.dailyDeaths + '†'} </data>

                                </div>

                                <div className={styles.dailyCases}>
                                    <label>NOWE PRZYPADKI: </label>
                                    <data>{this.state.dailyCases === null ? '0' : '+' + this.state.dailyCases }</data>

                                </div>



                            </div>

                            <div className={styles.deathsAndRecoveredWrapper}>

                                <div>
                                    <label>ZMARŁO:</label>
                                    <div className={styles.deathsPoland}>{this.state.deaths} † </div>
                                </div>

                                <div>
                                    <label>WYZDROWIAŁO:</label>
                                    <div className={styles.recoveredPoland}>{this.state.recovered}</div>
                                </div>

                            </div>

                            <div className={styles.deathRate}>W Polsce co<span>{Math.ceil(this.state.confirmed / this.state.deaths)}</span> zakażona osoba umiera † z powodu koronawirusa.</div>
                            <div className={styles.deathRate}>Do tej pory wyzdrowiało <span>{this.Round(this.state.recovered / this.state.confirmed*100, 2)}%</span> chorych.</div>
                            <div className={styles.deathRate}><span>{this.Round(this.state.confirmed / 38383000*100, 3)}%</span> obywateli Polski jest zarażonych.</div>
                            <div className={styles.deathRate}>Co oznacza, że co <span>{this.numberParse(Math.ceil(38383000 / this.state.confirmed))}</span> polak otrzymał pozytywny wynik testu na wirusa SARS-CoV-2.</div>

                            <caption>AKTUALIZACJA: {this.state.lastUpdatedObject.toLocaleString()}</caption>
                        </div>
                    </div>

                    <div className={styles.countryBox}>

                        <div className={styles.countryCasesBox}>
                            <label>Przypadki na świecie:</label>
                            <data>{this.numberParse(parseInt(this.state.totalCases))}</data>
                        </div>


                        <div className={styles.deathsAndRecoveredBox}>

                            <div>
                                <label>ZMARŁO:</label>
                                <div className={styles.deathsPoland}>{this.numberParse(parseInt(this.state.totalDeaths))} † </div>
                            </div>

                            <div>
                                <label>WYZDROWIAŁO:</label>
                                <div className={styles.recoveredPoland}>{this.numberParse(parseInt(this.state.totalRecovered))}</div>
                            </div>

                        </div>

                        <div className={styles.deathRateBox}>Na świecie co<span>{Math.ceil(this.state.totalCases / this.state.totalDeaths)}</span> zakażona osoba umiera † z powodu koronawirusa, co stanowi <span>{this.Round(this.state.totalDeaths/this.state.totalCases*100,2) + '%'}</span> wszystkich przypadków.</div>
                        <div className={styles.deathRateBox}>Do tej pory wyzdrowiało <span>{this.Round(this.state.totalRecovered / this.state.totalCases*100, 2)}%</span> wszystkich chorych.</div>
                        <div className={styles.deathRateBox}><span>{this.Round(this.state.totalCases / 7774800000*100, 2)}%</span> populacji Ziemii jest zarażona.</div>
                        <div className={styles.deathRateBox}>Co oznacza, że co <span>{this.numberParse(Math.ceil(7774800000 / this.state.totalCases))}</span> mieszkaniec globu otrzymał pozytywny wynik testu na wirusa SARS-CoV-2.</div>



                    </div>

                    <PolandChart polandRegions={this.state.polandRegions}/>

                    <div className={styles.dataTablesWrapper}>

                        <div className={styles.polandRegionsWrapper}>

                            <header>Koronawirus w Polsce (Województwa)</header>

                            {
                                this.state.polandRegions.map((region, i) => {
                                    return(
                                        <div key={region.jpt_nazwa_} className={styles.regionWrapper}>

                                            <div className={styles.regions}>
                                                <p>{i+1}.{region.jpt_nazwa_.toUpperCase()}</p>
                                            </div>

                                            <div className={styles.cases}>

                                                <div className={styles.regionConfirmed}>
                                                    {region.SUM_Confirmed}
                                                </div>
                                                <div className={styles.regionDeaths}>
                                                    <span className={styles.cross}>†</span>{ + region.SUM_Deaths}
                                                </div>

                                            </div>

                                        </div>
                                    );
                                })
                            }

                        </div>

                        <div className={styles.countryTotalWrapper}>

                            <header>SARS-CoV-2 na świecie
                                (% =  ozdrowieńcy)</header>






                            {

                                this.state.totalCountriesArray.map((country, i) => {

                                    if (i<14 || country.Country_Region === 'Poland'){
                                        return (

                                            <div key={i + 'heh'} className={country.Country_Region === 'Poland'  || i<3 ?  styles.countryWrapperContrast : styles.countryWrapper}>


                                                <label>{i + 1}.</label>

                                                <p>{country.Country_Region.toUpperCase()}</p>

                                                <data className={styles.recoveredCountries}>
                                                    {this.Round(country.Recovered / country.Confirmed * 100, 2)}%
                                                </data>

                                                <data>
                                                    {this.numberParse(country.Confirmed)}
                                                </data>

                                                <div className={styles.skull}>†</div>

                                                <data className={styles.countryDeaths}>

                                                    {this.numberParse(country.Deaths)}

                                                </data>





                                            </div>


                                        );
                                    }


                                })

                            }





                        </div>

                    </div>

                </div>


            </>
        );
    }

}

export default WebScraping;