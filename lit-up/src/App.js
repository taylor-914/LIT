import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'

import Navigation from './Navigation/Navigation'
import Gallery from './Gallery/Gallery'
import DynamicChart from './DynamicChart/DynamicChart'
import CourseSelector from './CourseSelector/CourseSelector'
import './App.css';


function App() {
  return (
    <div className="App">
        {/* <Navigation />
        <Gallery />
        <CourseSelector /> */}
        
        <DynamicChart />
    </div>
  );
}

export default App;
