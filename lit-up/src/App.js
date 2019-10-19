import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'

import Navigation from './Navigation/Navigation'
import Gallery from './Gallery/Gallery'
import DynamicChart from './DynamicChart/DynamicChart'
import './App.css';


function App() {
  return (
    <div className="App">
        <Navigation />
        <Gallery />
        <DynamicChart />
        <Button variant="contained" color="primary">Hello Tyler</Button>
    </div>
  );
}

export default App;
