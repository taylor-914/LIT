import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';

import Navigation from './Navigation/Navigation'
import Gallery from './Gallery/Gallery'
import DynamicChart from './DynamicChart/DynamicChart'
import CourseSelector from './CourseSelector/CourseSelector'
import './App.css';
import style from './App.module.css'
import { StylesContext } from '@material-ui/styles/StylesProvider';


function App() {
  return (
    <div className="App">
        {/* <Navigation />
        <Gallery />
        <CourseSelector /> */}
        <div className={style.container}>
          <h1>WHAT’S RIGHT FOR YOU</h1>
          <Grid className={style.grid}
            container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={3}>
              <p>Aggressive growth leads to higher volatility but typically increases growth long-term.</p>
            </Grid>
            <Grid item sm>
              <div className={style.margin}>
                <DynamicChart />
              </div>
            </Grid>
          </Grid>
      </div>
    </div>
  );
}

export default App;
