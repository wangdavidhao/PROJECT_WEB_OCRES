import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import {LinearProgress} from '@material-ui/core';
//Fetch API
import axios from 'axios';

//Local imports
import './Dashboard.css';
import Navbar from './Navbar.js';
import DptTable from './../widgets/DptTable.js';
import WorldTable from './../widgets/WorldTable.js';
import DropdownCountry from './../widgets/DropdownCountry.js';
import WorldGraph from './../widgets/WorldGraph.js';
import CircularGraph from './../widgets/CircularGraph';
import DptBar from './../widgets/DptBar.js';
import ListData from '../widgets/ListData.js';
import Map from './../widgets/Map.js';
import Frequences from '../widgets/Frequences';

//URL de l'API mondiale
const API_URL = 'https://disease.sh/v3/covid-19';

//URL de l'API data.gouv.fr
const API_URL_GOUV = 'https://www.data.gouv.fr/fr/datasets';

//URL pour la FRANCE
const API_URL_FRANCE = 'https://coronavirusapi-france.now.sh';
//AllLiveData
//https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/#_

export const Dashboard = () => {

    //State pour chaque type de data
    const [world, setWorld] = useState({});
    const [country, setCountry] = useState({});
    const [countries, setCountries] = useState([]);
    const [continent, setContinent] = useState({});
    const [continents, setContinents] = useState([]);
    // const [france, setFrance] = useState([]);

    const [worldHistoric, setWorldHistoric] = useState({});
    const [countryHistoric, setCountryHistoric] = useState({});
    const [countriesHistoric, setCountriesHistoric] = useState([]);

    const [gender, setGender] = useState([]);
    const [age, setAge] = useState([]);
    const [generalInfo, setGeneralInfo] = useState([]);

    const [table, setTable] = useState([]);
    
    const [selectCountry, setSelectCountry] = useState('monde');
    const [type, setType] = useState('cases');

    //State pour dropdown
    const [dropdownCountry, setDropdownCountry] = useState({isWorld:true}); //Spread operator, par défaut: dropdown select sur le monde
    const [dropdownHistoric, setDropdownHistoric] = useState({});

    //Loading
    const [loadingMap, setLoadingMap] = useState(true);
    const [loadingDptTable, setLoadingDptTable] = useState(true);
    const [loadingCircu, setLoadingCircu] = useState(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [loadingGraph, setLoadingGraph] = useState(true);

    

    //Map
    const [map, setMap] = useState({
        lat:46,
        long:2,
        zoom:0.8,
    })

    /**
     * Fonction qui va trier le nombre de cas total par pays dans l'odre décroissant
     */
    const sortCasesDsc = (countriesTable) => {
        const sortedTable = countriesTable;
        return sortedTable.sort((countryA, countryB) => countryA.cases > countryB.cases ? -1 : 1  );
        
    }

    /**
     * Fonction qui va get toute la data sur le monde 
     * Puis sauvegarde dans le state world
     */
    const fetchAllData = () => {

        axios.get(`${API_URL}/all`)
        .then( (response) => {
            setWorld(response.data);
            setDropdownCountry({...dropdownCountry, isWorld:true, ...response.data});
            setMap({
                lat:46,
                long:2,
                zoom:0.8,
            });

        })
        .then(() =>{
                setLoadingMap(false);
        }
        )
        .catch((error) => {
            if(error.response){
                console.log('Erreur world ' + error.response.status);
            }else if(error.request){
                console.log('Erreur world ' + error.request);
            }else{
                console.log('Erreur world ' + error.message);
            }
        })

    }

    //Second method
    /**
     * Fonction qui va get toute la data de tous les pays par défaut si pays non spécifié
     * Puis sauvegarde dans les states
     * @param {String} country 
     */
    const fetchCountriesData = async (country='') => {

        try{
            //Get la reponse 
            const response = await axios.get(`${API_URL}/countries/${country}`);
            //Si pays non spécifié alors tableau sinon objet
            if(!country){
                setCountries(response.data);
                const sortedTable = sortCasesDsc(response.data);
                setTable(sortedTable);
                setLoadingMap(false);
            }else{
                setCountry(response.data);
                setDropdownCountry({...dropdownCountry, isWorld:false, ...response.data});
                setMap({
                    lat:response.data.countryInfo.lat,
                    long:response.data.countryInfo.long,
                    zoom:4,
                });
                setLoadingMap(false);
            }
        }catch(error){
            if(error.response){
                console.log('Erreur fetching country ' + error.response.status);
            }else if(error.request){
                console.log('Erreur fetching country ' + error.request);
            }else{ 
                console.log('Erreur fetching country ' + error.message);
            }
        }
    }

    /**
     * Fonction qui va get toute la data de tous les continents par défaut si continent non spécifié
     * Puis sauvegarde dans les states
     * @param {String} continent 
     */
    const fetchContinentsData = async (continent='') => {

        try{
            //Get la reponse
            const response = await axios.get(`${API_URL}/continents/${continent}`);
            //Si continent spécifié alors tableau sinon objet
            if(!continent){
                setContinents(response.data);
            }else{
                setContinent(response.data);
            }
        }catch(error){
            if(error.response){
                console.log('Erreur fetching continent ' + error.response.status);
            }else if(error.request){
                console.log('Erreur fetching continent ' + error.request);
            }else{
                console.log('Erreur fetching continent ' + error.message);
            }
        }     
    }

    /**
     * Fonction qui va get toute la data du monde, d'un pays ou de tous les pays concernant l'historique du dernier mois
     * @param {String} country 
     */
    const fetchCountriesHistoric = async (country='') => {

        try{
            const response = await axios.get(`${API_URL}/historical/${country}?lastdays=90`);
            if(country === 'all'){
                setWorldHistoric(response.data);
                setDropdownHistoric(response.data);
                setLoadingGraph(false);
            }else if(!country){
                setCountriesHistoric(response.data);
            }else{
                setCountryHistoric(response.data);
                setDropdownHistoric(response.data.timeline);
                setLoadingGraph(false);
            }
        }catch(error){
            if(error.response){
                console.log('Erreur fetching historic ' + error.response.status);
            }else if(error.request){
                console.log('Erreur fetching historic ' + error.request);
            }else{
                console.log('Erreur fetching historic ' + error.message);
            }
        }
    }

    /**
     * Fonction qui va récup un fichier CSV (COMMA SEPARATED VALUE) et retourner sous forme d'objet JS
     * @param {String} Ref CSV
     */
    const fetchGouvData = async (refData) => {

        try{
            const response = await axios.get(`${API_URL_GOUV}${refData}`);
            const data = await response.data;

            //Tableau d'objet final
            const franceGenderData = [];

            //Transforme les lignes CSV (Comma Separated Value) 
            const splitedCsv = data.toString().split('\n');  //Split à chaque retour à la ligne
            const csvTitle = splitedCsv[0]; // On prend la première ligne (header) 
            const csvTitleArray = csvTitle.split(';'); //On split le header à chaque ';' => Renvoie un Array avec tous les labels du header
            const csvTitleArrayFinal = [];

            //Pour chaque valeur de l'Array on enlève les "" qui entoure 
            for(let i=0 ; i < csvTitleArray.length ; i++){
                const title = csvTitleArray[i].substring(1, csvTitleArray[i].length-1); //On prend le string excepté le premier et le dernier élément
                csvTitleArrayFinal.push(title); //On le push dans l'Array final pour le header
            }

            //On commence à 1 car 0 = header
            for(let i=1; i< splitedCsv.length ; i++){

                const csvData = splitedCsv[i];
                const csvDataArray = csvData.split(';');

                //Chaque tour de boucle on clear le tableau et l'objet temporaire
                const csvDataArrayTemp = [];
                const objTemp = {};
                
                for(let j=0 ; j< csvDataArray.length ; j++){
                    
                    const first = csvDataArray[j].charAt(0); 
                    const last =  csvDataArray[j].charAt(csvDataArray[j].length-1); 

                    //Si le premier element et le dernier sont des "
                    if(first === '"' && last === '"'){
                        const data = csvDataArray[j].substring(1, csvDataArray[j].length-1); //Alors on les enleve
                        csvDataArrayTemp.push(data);
                    }
                    else{
                        const data = csvDataArray[j]; //Sinon on fait rien
                        csvDataArrayTemp.push(data);
                    }
                }   
                //On parcourt chaque element du tableau pour le rendre en key dans l'objet 
                //data = index, incrémentation car forEach(item, index, arr) item=title index=data
                csvTitleArrayFinal.forEach((title, data) => {
                    objTemp[title] = csvDataArrayTemp [data]; //Chaque key à une data
                });
                franceGenderData.push(objTemp); //On l'ajoute dans l'Array final
            }
            switch (refData) {
                case '/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7':
                    setGender(franceGenderData);
                    break;
                case '/r/08c18e08-6780-452d-9b8c-ae244ad529b3':
                    setAge(franceGenderData);
                    break;
                case '/r/6fadff46-9efd-4c53-942a-54aca783c30c':
                    setGeneralInfo(franceGenderData);
                    break;
                default:
                    console.log(`Sorry, we can't set any variable.`);
                    break;
            }

            setLoadingCircu(false);
            setLoadingBar(false);
        }catch(error){
            if(error.response){
                console.log('Erreur fetching gouv' + error.response.status);
            }else if(error.request){
                console.log('Erreur fetching gouv ' + error.request);
            }else{
                console.log('Erreur fetching gouv ' + error.message);
            }
        }
    }

    // /**
    //  * Fonction qui va récup des datas + précises concernant la FRANCE
    //  * @param {String} route 
    //  */
    // const fetchFranceData = async (route='') => {
    //     axios.get(`${API_URL_FRANCE}/${route}`)
    //     .then( (response) => {
    //         const fr = response.data.allLiveFranceData;
    //         setFrance(fr);
    //     })
    //     .then(()=> {
    //         setLoadingDptTable(false);
    //     })
    //     .catch(error => {
    //         if(error.response){
    //             console.log('Erreur  ' + error.response.status);
    //         }else if(error.request){
    //             console.log('Erreur  ' + error.request);
    //         }else{
    //             console.log('Erreur  ' + error.message);
    //         }
    //     })
    // }

    /**
     * Fonction qui va comparer le nombre de cas aujourd'hui et le comparer à celui d'hier et retourner un nouveau tableau 
     * avec un attribut en plus 
     */
    const createNewTablePrevious = (countries) => {
        let countriesHistoricTemp = countriesHistoric;  //State countriesHistoric stockée de manière temp
        let countriesTemp = countries; //State countries
        let countriesTemp3 = [];

        //Parcourt de tous les pays 
        for(let i=0; i<countriesHistoricTemp.length;i++){

            //On se positionne sur l'objet cases avec toutes les dates
            const obj = countriesHistoricTemp[i].timeline.cases;

            //Les 3 derniers jours
            const lastDay = obj[Object.keys(obj)[Object.keys(obj).length-1]];
            const lastDay2 = obj[Object.keys(obj)[Object.keys(obj).length-2]];
            const lastDay3 = obj[Object.keys(obj)[Object.keys(obj).length-3]];

            //La diff du nombre des cas
            const diffLast = lastDay - lastDay2;
            const diffLast2 = lastDay2 - lastDay3;

            //On cherche le pays avec le meme nom
            const countriesTemp2 = countriesTemp.find((country) => country.country === countriesHistoricTemp[i].country);
            if(countriesTemp2){
                countriesTemp2["previous"] = diffLast > diffLast2 ? 'true' : 'false'; //Ajout d'un attribut previous 
                countriesTemp3.push(countriesTemp2); //Push dans un tableau
            } 
        }
        return countriesTemp3;
        
    }
    
    //Charge au chargement de la page
    useEffect(() => {
        fetchAllData(); //Set dropdownCountry à monde
        fetchCountriesData();  //Pour create newTablePrevious, liste dropdown et sorted Table
        fetchCountriesHistoric(); //Pour create newTablePreview
        fetchCountriesHistoric('all'); //Pour dropdown historic monde
        fetchGouvData('/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7');
        fetchGouvData('/r/08c18e08-6780-452d-9b8c-ae244ad529b3');
        fetchGouvData('/r/6fadff46-9efd-4c53-942a-54aca783c30c');
        // fetchFranceData('AllLiveData');
    }, []);
    

    if(countries?.length > 0 && countriesHistoric?.length > 0){
        createNewTablePrevious(countries);
    }

    /**
     * Fonction qui va changer les states en focntion du select dans le dropdown
     * @param {*} e 
     */
    const handleCountrySelect = (e) => {

        //On get le numéro iso2 du pays ou le string 'monde' grâce à la value dans MenuItem
        const countryIso = e.target.value;
        //On fetch selon 
        if(countryIso === 'monde'){
            fetchAllData();
            fetchCountriesHistoric('all');
        }else{
            fetchCountriesData(`${countryIso}`);
            fetchCountriesHistoric(`${countryIso}`);
        }
        setSelectCountry(countryIso); //On set le select du dropdown
    }

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear().toString().substr(-2);
    date.setDate(date.getDate()-1);
    const twoDaysAgo = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear().toString().substr(-2);

    //Render => affichage
    return (
        <Container fluid={true} className="dashboard">
            <Navbar page="dashboard"/>
            <Row>
                <Col lg={8}  className="dashboard__global">
                    {!loadingMap ? <Row>
                        
                        <Col lg={12} className="order-md-12">
                            <Row className="dashboard__global--buttonsContainer">
                                <Col lg={3} md={3} sm={3} xs={3} className="dashboard__global--button">
                                    <Button onClick={() => setType('cases')} className={type === 'cases' ? 'cases active' : 'cases'}>Cas</Button>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3} className="dashboard__global--button">
                                    <Button onClick={() => setType('recovered')} className={type === 'recovered' ? 'recovered active' : 'recovered'}>Rétablis</Button>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3} className="dashboard__global--button">
                                    <Button onClick={() => setType('deaths')} className={type === 'deaths' ? 'deaths active' : 'deaths'}>Décès</Button>
                                </Col>
                                <Col lg={3} md={3} sm={3} xs={3} className="dashboard__global--button">
                                    <DropdownCountry countries={countries} selectCountry={selectCountry} handleCountrySelect={handleCountrySelect} />
                                </Col>
                            </Row>

                        </Col>
                        <Col lg={12} className="order-md-1">
                            <Row className="dashboard__global--mapContainer">
                                <Col lg={4} md={4} sm={12} className="dashboard__global--table">
                                    <h4>Tableau mondial des cas</h4>
                                    <WorldTable countriesData={table}/>
                                </Col>
                                <Col lg={8} md={8} sm={12} className="dashboard__global--map">
                                    <h4>Map mondiale</h4> 
                                    <Map {...map} countries={countries} type={type}/>                          
                                </Col>
                            </Row>
                        </Col>
                    </Row> : <Spinner animation="grow" variant="secondary" />}
                    

                    <Row className="dashboard__global--graphContainer">
                        {!loadingGraph ? 
                        <>
                        <Col lg={2} md={2} className="dashboard__global--frequences">
                            <h4>Fréquences</h4>
                            <Frequences countrySelected={dropdownCountry}/> 
                        </Col>
                        <Col lg={8} md={8} sm={12} className="dashboard__global--graph">
                            <WorldGraph countrySelected={dropdownCountry} countryHistoric={dropdownHistoric} type={type}/>
                        </Col>
                        <Col lg={2} md={2} className="dashboard__global--dropdown">
                            
                            {!dropdownCountry.isWorld ? <div className="dashboard__global--dropdown">
                                <h5>{country.country}</h5>
                                <img src={dropdownCountry.countryInfo.flag}></img>
                            </div> : <h5>Monde</h5>}
                            <span><strong>Cas :</strong> {dropdownCountry.cases}</span>
                            <p className="dashboard__global--addCases">
                            <i> +{dropdownCountry.todayCases === 0 ? dropdownHistoric.cases[yesterday] - dropdownHistoric.cases[twoDaysAgo] : dropdownCountry.todayCases}
                            </i></p>
                            <span><strong>Rétablis :</strong> {dropdownCountry.recovered}</span>
                            <p className="dashboard__global--addRecovered">
                            <i> +{dropdownCountry.todayRecovered === 0 ? dropdownHistoric.recovered[yesterday] - dropdownHistoric.recovered[twoDaysAgo] : dropdownCountry.todayRecovered}
                            </i></p>
                            <span><strong>Morts :</strong>{dropdownCountry.deaths}</span>
                            <p className="dashboard__global--addDeaths">
                            <i> +{dropdownCountry.todayDeaths === 0 ? dropdownHistoric.deaths[yesterday] - dropdownHistoric.deaths[twoDaysAgo] : dropdownCountry.todayDeaths}
                            </i></p>  
                        </Col>
                        </> : <Spinner animation="grow" variant="secondary" />}
                        
                    </Row>

                </Col>
                <Col lg={4} className="dashboard__france">

                    <Row className="dashboard__france--dptTableContainer">
                        <Col lg={12} md={12} sm={12} className="dashboard__france--dptTable">
                            <h4>Règles gouvernement</h4>
                            <ListData isAdmin={false}/>
                        </Col>
                    </Row>

                    <Row className="dashboard__france--circuContainer">
                    {!loadingCircu ? 

                        <>
                        <Col lg={12} className="dashboard__france--graphCircu">
                            <h4>Pourcentages en France</h4>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12} className="dashboard__france--graphCircu">
                            <CircularGraph info ={gender} color={"#bff542"} type={"gender"} />
                        </Col>  
                        <Col lg={4} md={4} sm={4} xs={12} className="dashboard__france--graphCircu">
                            <CircularGraph info ={age} color={"#0022ff"} type={"age"}/>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12} className="dashboard__france--graphCircu">
                            <CircularGraph info ={generalInfo} color={"#fa0400"} type={"generalInfo"}/> 
                        </Col>         
                        </>             
                    : <Spinner animation="grow" variant="secondary" />}
                    </Row> 
                    

                    <Row className="dashboard__france--dptBarContainer">
                        {!loadingBar ? 
                        <Col lg={12} className="dashboard__france--dptBar">
                            <h4>Données France</h4>
                            <DptBar info={generalInfo}/>
                        </Col> : <Spinner animation="grow" variant="secondary" /> }
                        
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
