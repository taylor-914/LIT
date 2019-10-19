import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Button from '@material-ui/core/Button'

import styles from'./DynamicCharts.module.css'


export default class DynamicCharts extends React.Component {

    state = {
        vol: 0.08,
        return: 0.11,
        options: {
        title: {
          text: 'Mr.Money Bags'
        },
        xAxis: {
            text: 'Years'
        },
        yAxis: {
            text: 'Investment Value ($)'
        },
        legend: {
            enabled: false
        },
        series: [{
          type: "area",
          name: "Investments",
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
        const data = this.generateData();
        console.log(data)
        const newOptions = {...this.state.options}
        newOptions.series[0].data = data;
        this.setState({options: newOptions})
        console.log(newOptions)
    }

    generateData(length = 60, initialInvestment = 10000) {

        function random_bm(ret, vol){
            //Box-Muller transform
            let u = 0;
            let v = 0;
            while (u===0) u = Math.random(); //Converting [0,1) to (0,1)
            while (v===0) v = Math.random();
            
            // Fix Gaussian Transformation
            return ret/12 +  vol * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        }

        //Monthly voltility and return
        const time = Array(length).fill(0).map((_, ind) => ind)
        const x = this.state.return 
        const y = this.state.vol
        const monthlyReturn = time.map(() => random_bm(x, y))

        const monthlyReturnCumSum = []
        monthlyReturn.reduce(function(a,b,i) { 
            if (a === -1 || a+b < -1){
                return monthlyReturnCumSum[i]= -1
            } else {
                return monthlyReturnCumSum[i] = a+b; 
            }
        },0);

        return time.map((value, ind) => [value, Math.round(initialInvestment * (1 + monthlyReturnCumSum[ind]))])
    }

    render(){
        return (  
            <React.Fragment>
                <Button variant="contained" color="primary">1 Year</Button>
                <Button variant="contained" color="primary">5 Years</Button>
                <Button variant="contained" color="primary">10 Years</Button>
                <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
            />
            </React.Fragment>
        )
    }
}
