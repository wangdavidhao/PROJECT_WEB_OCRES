import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

//Fetch API
import axios from 'axios';

//Local imports
import './Dashboard.css';
import Navbar from './Navbar.js';

//URL de l'API
const API_URL = 'https://disease.sh/v3/covid-19';

export const Dashboard = () => {

    //State pour chaque type de data
    const [world, setWorld] = useState({});
    const [country, setCountry] = useState({});
    const [countries, setCountries] = useState([]);
    const [continent, setContinent] = useState({});
    const [continents, setContinents] = useState([]);

    /**
     * Fonction qui va get toute la data sur le monde 
     * Puis sauvegarde dans le state world
     */
    const fetchAllData = async () => {

        const response = await axios.get(`${API_URL}/all`);
        setWorld(response.data);
    }

    /**
     * Fonction qui va get toute la data de tous les pays par défaut si pays non spécifié
     * Puis sauvegarde dans les states
     * @param {String} country 
     */
    const fetchCountriesData = async (country='') => {

        //Get la reponse 
        const response = await axios.get(`${API_URL}/countries/${country}`);
        //Si pays non spécifié alors tableau sinon objet
        if(!country){
            setCountries(response.data);
        }else{
            setCountry(response.data);
        }
    }

    /**
     * Fonction aui va get toute la data de tous les continents par défaut si continent non spécifié
     * Puis sauvegarde dans les states
     * @param {String} continent 
     */
    const fetchContinentsData = async (continent='') => {

        //Get la reponse
        const response = await axios.get(`${API_URL}/continents/${continent}`);
        //Si continent spécifié alors tableau sinon objet
        if(!continent){
            setContinents(response.data);
        }else{
            setContinent(response.data);
        }
    }

    useEffect(() => {
        fetchAllData();
        fetchCountriesData('france');
        fetchContinentsData('south america');
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
