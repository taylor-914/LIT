import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import styles from'./DynamicCharts.module.css'

const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

export default function DynamicCharts(props) {
    return         <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

}