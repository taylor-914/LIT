import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Navigation from './Navigation/Navigation'
import Gallery from './Gallery/Gallery'
import DynamicChart from './DynamicChart/DynamicChart'
import './App.css';

const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}


function App() {
  return (
    <div className="App">
        <Navigation />
        <Gallery />
        <DynamicChart />
        <Button variant="contained" color="primary">Hello Tyler</Button>

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
    </div>
  );
}

export default App;
