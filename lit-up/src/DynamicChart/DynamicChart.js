import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';

import styles from'./DynamicCharts.module.css'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

export default class DynamicCharts extends React.Component {

    state = {
        //vol is an integer and converted to a percentage using risk
        vol: 2,
        return: 8,
        risk: {1: 0.025,
                2: 0.05,
                3: 0.075},
        options: {
            title: {
            text: 'Stock Market Simulator'
            },
            line: {
                color:'#4c8c2b'
            },
            xAxis: {
                title: {
                    text: 'Years'
                },
                tickInterval: 2,

            },
            yAxis: {
                title: {
                    text: 'Investment Value ($)'
                },
                max: 30000
            },
            legend: {
                enabled: false
            },
            series: [{
            type: "area",
            name: "Return",
            data: []
            }],
            plotOptions:{
                // colorsAxis:{
                //     lineColor: '#4c8c2b'
                // // } ['#4c8c2b', '#4a7724'],
                // },
                area:{
                    marker: {
                        radius: 2
                    },
                    fillColor: 'rgba(76, 140, 43, 0.5)',
                    color: 'rgb(76, 140, 43)'
                }
            }
      }
    }

    componentDidMount(){
        this.resampleData()
    }

    resampleData(){
        console.log(`Return: ${this.state.return}`)
        console.log(`Risk: ${this.state.vol}`)
        const data = this.generateData();
        const newOptions = {...this.state.options}
        newOptions.series[0].data = data;
        this.setState({options: newOptions})
    }

    risk(){
        return this.state.risk[this.state.vol]
    }

    generateData(length = 121, initialInvestment = 10000) {

        function random_bm(ret, vol){
            //Box-Muller transform
            let u = 0;
            let v = 0;
            while (u===0) u = Math.random(); //Converting [0,1) to (0,1)
            while (v===0) v = Math.random();
            
            // Fix Gaussian Transformation
            return ret/12/100 +  vol * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        }

        //Monthly voltility and return
        const ret = this.state.return
        const risk = this.risk()
        const time = Array(length).fill(0).map((_, ind) => ind)
        const monthlyReturn = time.map(() => random_bm(ret, risk))

        const monthlyReturnCumSum = []
        monthlyReturn.reduce(function(a, b, i) { 
            if (a === -1 || a+b < -1){
                return monthlyReturnCumSum[i]= -1
            } else {
                return monthlyReturnCumSum[i] = a+b; 
            }
        },0);

        return time.map((value, ind) => [value/12, Math.round(initialInvestment * (1 + monthlyReturnCumSum[ind]))])
    }

    handleReturnChange(event, value){
        if (this.state.return !== value){
            this.setState({return: value}, this.resampleData)
        }
    }

    handleRiskChange(event, value){
        if (this.state.vol !== value){
            this.setState({vol: value}, this.resampleData)
        }
    }

    portfolioSelected(vol, ret) {
        this.setState({vol: vol, return: ret}, this.resampleData)
    }


    riskSelector(value) {
        this.setState({vol: value}, this.resampleData)
    }



    render(){

        const theme = createMuiTheme({
            palette: {
              primary: {
                // light: will be calculated from palette.primary.main,
                main: 'rgb(76, 140, 43)',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
              },
              secondary: {
                light: '#0066ff',
                main: '#0044ff',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
              },
              // error: will use the default color
            },
          });
          

        return (  
            <div className={styles.graph}>
                <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                />
                <InputLabel>Average Annual Return (%)</InputLabel>
                <ThemeProvider theme={theme}>
                    <Slider className={styles.slider}
                            aria-label="Expected Annual Return (%)"
                            label="Expected Annual Return (%)"
                            aria-valuetext="Expected Annual Return (%)"
                            valueLabelDisplay='on' 
                            step={1}
                            min={0}
                            max={14}
                            value={this.state.return}
                            onChange={this.handleReturnChange.bind(this)}
                    />
                    <Grid 
                        container
                        direction="row"
                        justify="space-around">   
                            <Button variant="contained" 
                                    color="primary"
                                    onClick={() => this.portfolioSelected(1, 4)}>
                                Conservative
                            </Button>
                            <Button variant="contained" 
                                    color="primary"
                                    onClick={() => this.portfolioSelected(2, 7)}>
                                Balanced
                            </Button>
                            <Button variant="contained" 
                                    color="primary"
                                    onClick={() => this.portfolioSelected(3, 10)}>
                                Growth
                            </Button>
                    </Grid>
                </ThemeProvider>
            </div>
        )
    }
}
