# DASHBOARD SUR LA COVID-19/COVID-19 DASHBOARD
![version](https://img.shields.io/badge/version-1.0-blue)
[![GitHub issues](https://img.shields.io/github/issues/wangdavidhao/PROJECT_WEB_OCRES)](https://github.com/wangdavidhao/PROJECT_WEB_OCRES/issues)

Dashboard qui va récolter différentes données pertinentes sur la covid-19 en France et dans le monde en temps réel et les afficher sous formes graphiques.

A dashboard that will collect some COVID-19 data and display them into charts.

Widgets :

- Tableau mondial des cas / Table of cases in the world
- Carte mondiale / Worldwide map
- Graphique / Graph
- Règles gouvernement / Government's rules
- Poucentages / Percentages
- Données hospitalières en France / French hospital data


Frontend : 
![](app_preview/dashboard.gif)

Backend :
![](app_preview/admin.gif)

## Table des matières/Table of contents
* 🚧 [Installation](#installation)
* 👀 [Etat du projet](#etat-du-projet)
* 🤝 [Outils de gestion de projet/Project management's tool](#outils-de-gestion-projet)
* 📂 [API réferences](#api-réferences)
* 💻 [Technologies](#technologies)
* 👨🏻‍🤝‍👨🏻 [Collaborateurs](#collaborateurs)
* 🧩 [Annexes](#annexes)

## Installation

Install : 

-   [Mongo](https://www.mongodb.com/) 
-   [ExpressJS](https://expressjs.com/) 
-   [ReactJS](https://reactjs.org/) 
-   [Node](https://nodejs.org/en/) 11.4.0+ 

Cloner le projet dans un répertoire puis :

Se placer dans le dossier backend et lancer la commande :
__npm install__

Se placer dans le dossier frontend et lancer la commande :
__npm install && npm start__ pour lancer l'application.

Clone/fork the project and :

In the backend folder, run : 
__npm install && npm start__
The link for the database is already in the .env file as the project is only for school purpose and not a professional one.
You can also change the database url by replacing it with your local link with the port 27017 by changing the .env file.
If you choose to run locally, you can import the json files from the exportDbb folder to your local database.



In the frontend folder, run : 
__npm install && npm start__ to launch the application.


Le frontend est lancé sur le port 3000, tandis que le backend est lancé sur le port 9000.
The frontend is launched on port 3000, while the backend is launched on port 9000.

__Backend__
```bash
$ npm install && npm start
```

__Frontend__
```bash
$ npm install && npm start
```

## Etat du projet

Ce projet fait intervenir une API que nous avons créer. Elle est donc à la fois composée du frontend et du backend

This project contains both the front and the back of the project. 

## Outils de gestion projet

- Trello:
https://trello.com/b/M4wvzsn0/projet-web

## API réferences

- Données mondiale/World data: https://disease.sh/v3/covid-19/all
- Données départementales/French departments data : https://coronavirusapi-france.now.sh/AllLiveData
- Données gouvernement Français/French government data : https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/#_


## Technologies

- Node JS - React JS - Express JS - CSS
- Axios HTTP Request - JWT - Bcrypt - Joi
- MongoDB - Mongoose
- Bootstrap 4 - Material UI
- Recharts - Chart JS - Router-dom 
- Dev : Storybook - Nodemon

## Collaborateurs

- SADOUN Benjamin : benjamin.sadoun@edu.ece.fr https://github.com/wangdavidhao
- WANG David : david.wang@edu.ece.fr https://github.com/BenjaminSadoun

## Annexes
![](app_preview/preview1.PNG)
