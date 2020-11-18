import React from 'react';
import './App.css';

import {Container} from 'react-bootstrap';

//Local imports
import Routing from './Routing.js';

//App container qui va regrouper tous les autres components ( widgets n)
export const App = () => {
  return (
    <Container fluid={true} className="app">
      <Routing/>
    </Container>
  );
}

export default App;
