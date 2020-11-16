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
const API_URL_FRANCE = 'https://www.data.gouv.fr/fr/datasets';

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


    const fetchFranceData = async () => {
        const response = await axios.get(`${API_URL_FRANCE}/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7`);
        console.log(response.data);
    }

    useEffect(() => {
        // fetchAllData();
        // fetchCountriesData('france');
        // fetchContinentsData('south america');
        // fetchCountriesHistoric('france');
        fetchFranceData();
    }, []);

    return (
        <Container fluid={true} className="dashboard">
            <Navbar page="dashboard"/>
            <Row>
                <Col lg={3}>
                <h1>Cas et décès</h1>
                {/*TableauCas*/}
                </Col>
                <Col lg={3}>
                <h1>Taux risques</h1>
                {/*TableauRisque*/}
                </Col>
                <Col lg={6}>
                {/*Map*/}
                    {/*TableauCas*/}
                    {/**Taux */}
                <h1>Map</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                {/**Graphe */}
                </Col>
                <Col lg={6}>
                <Row>
                    <Col lg={6}>
                    <h3>Histogrammes</h3>
                    {/**Histo */}
                    </Col>
                </Row>
                <Row>
                    {/**GraphesCircu */}
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
