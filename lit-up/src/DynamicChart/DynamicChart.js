import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'

import styles from'./DynamicCharts.module.css'


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
            text: 'Mr.Money Bags'
            },
            xAxis: {
                text: 'Years'
            },
            yAxis: {
                text: 'Investment Value ($)',
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
                area:{
                    marker: {
                        radius: 2
                    }
                }
            }
      }
    }

    componentDidMount(){
        this.resampleData()
    }

    resampleData(){
        const data = this.generateData();
        const newOptions = {...this.state.options}
        newOptions.series[0].data = data;
        this.setState({options: newOptions})
    }

    risk(){
        return this.state.risk[this.state.vol]
    }

    generateData(length = 120, initialInvestment = 10000) {

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

        return time.map((value, ind) => [value, Math.round(initialInvestment * (1 + monthlyReturnCumSum[ind]))])
    }

    handleReturnChange(event, value){
        if (this.state.return !== value){
            this.setState({return: value})
            this.resampleData()
        }
    }

    handleRiskChange(event, value){
        if (this.state.vol !== value){
            this.setState({vol: value})
            this.resampleData()
        }
    }

    conservativeSelected() {
        this.setState({vol: 1, return: 4})
        this.resampleData()
    }

    balancedSelected() {
        this.setState({vol: 2, return: 10})
        this.resampleData()
    }

    growthSelected() {
        this.setState({vol: 3, return: 16})
        this.resampleData()
    }


    render(){
        return (  
            <div className={styles.graph}>
                <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                />
                <Slider key="Risk"
                        className={styles.slider}
                        valueLabelDisplay='on' 
                        step={1}
                        min={0}
                        max={20}
                        // defaultValue={8}
                        value={this.state.return}
                        onChange={this.handleReturnChange.bind(this)}
                />
                <Slider className={styles.slider}
                        valueLabelDisplay='on' 
                        step={1}
                        min={1}
                        max={3}
                        // defaultValue={2}
                        value={this.state.vol}
                        marks={['Low', 'Medium', 'High']}
                        onChange={this.handleRiskChange.bind(this)}
                />
                <Grid 
                    container
                    direction="row-reverse"
                    justify="space-around">   
                    <Button variant="contained" 
                            color="primary"
                            onClick={this.conservativeSelected.bind(this)}>
                        Conservative
                    </Button>
                    <Button variant="contained" 
                            color="primary"
                            onClick={this.balancedSelected.bind(this)}>
                        Balanced
                    </Button>
                    <Button variant="contained" 
                            color="primary"
                            onClick={this.growthSelected.bind(this)}>
                        Growth
                    </Button>
                </Grid>
            </div>
        )
    }
}
