import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

//Fetch API
import axios from 'axios';

//Local imports
import './Dashboard.css';
import Navbar from './Navbar.js';

//URL de l'API mondiale
const API_URL = 'https://disease.sh/v3/covid-19';

//URL de l'API data.gouv.fr
const API_URL_GOUV = 'https://www.data.gouv.fr/fr/datasets';

//URL pour la FRANCE
const API_URL_FRANCE = 'https://coronavirusapi-france.now.sh';
//https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/#_

export const Dashboard = () => {

    //State pour chaque type de data
    const [world, setWorld] = useState({});
    const [country, setCountry] = useState({});
    const [countries, setCountries] = useState([]);
    const [continent, setContinent] = useState({});
    const [continents, setContinents] = useState([]);

    const [worldHistoric, setWorldHistoric] = useState({});
    const [countryHistoric, setCountryHistoric] = useState({});
    const [countriesHistoric, setCountriesHistoric] = useState([]);

    const [gender, setGender] = useState([]);

    //First method
    /**
     * Fonction qui va get toute la data sur le monde 
     * Puis sauvegarde dans le state world
     */
    const fetchAllData = () => {

        axios.get(`${API_URL}/all`)
        .then( (response) => {
            setWorld(response.data);
        })
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
            }else{
                setCountry(response.data);
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
            const response = await axios.get(`${API_URL}/historical/${country}`);
            if(country === 'all'){
                setWorldHistoric(response.data);
            }else if(!country){
                setCountriesHistoric(response.data);
            }else{
                setCountryHistoric(response.data);
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
    const fetchGouvData = async (refData='/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7') => {

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
                    const data = csvDataArray[j].substring(1, csvDataArray[j].length-1);
                    csvDataArrayTemp.push(data);
                }   
                //On parcourt chaque element du tableau pour le rendre en key dans l'objet 
                //data = index, incrémentation car forEach(item, index, arr) item=title index=data
                csvTitleArrayFinal.forEach((title, data) => {
                    objTemp[title] = csvDataArrayTemp [data]; //Chaque key à une data
                });
                franceGenderData.push(objTemp); //On l'ajoute dans l'Array final
            }

            setGender(franceGenderData);

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

    /**
     * Fonction qui va récup des datas + précises concernant la FRANCE
     * @param {String} route 
     */
    const fetchFranceData = async (route='') => {
        axios.get(`${API_URL_FRANCE}/${route}`)
        .then( (response) => {
            console.log(response.data); //Pas de state pour l'instant
        })
        .catch(error => {
            if(error.response){
                console.log('Erreur  ' + error.response.status);
            }else if(error.request){
                console.log('Erreur  ' + error.request);
            }else{
                console.log('Erreur  ' + error.message);
            }
        })

    }
    

    useEffect(() => {
        // fetchAllData();
        // fetchCountriesData('france');
        // fetchContinentsData('south america');
        // fetchCountriesHistoric('france');
        // fetchGouvData();
        // fetchFranceData('FranceLiveGlobalData');
    }, []);

    //Render => affichage
    return (
        <Container fluid={true} className="dashboard">
            <Navbar page="dashboard"/>
            <Row>
                <Col lg={7}>
                    {/**Global */}
                    <Row>
                        <Col lg={12}>
                            {/**Map */}
                            Map
                                {/**TableauMonde */}
                                {/**Dropdown pour changer de pays*/}
                                {/**Dropdown pour changer de types : cas/rétablis/décès */}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            {/**Graphe */}
                            Graphe
                                {/**Taux/Fréquences */}
                                {/**Dropdown pour changer de pays*/}
                                {/**Chevrons pour changer de data */}
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}>
                    {/**France */}
                    <Row>
                        <Col lg={12}>
                            {/**TableauDpt */}
                            Tableau Dpt
                        </Col>
                    </Row>
                    <Row>
                        {/**GraphesCircu */}
                        <Col lg={4}>
                            GrapheCircu Age
                        </Col>
                        <Col lg={4}>
                            GrapheCircu Sexe
                        </Col>
                        <Col lg={4}>
                            GrapheCircu Hospi
                        </Col>
                    </Row>
                    <Row>
                        {/**Histogrammes */}
                        <Col lg={12}>Histogrammes</Col>
                            {/**Dropdown pour changer dpt */}
                            {/**Chevron pour changer de type de data */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
