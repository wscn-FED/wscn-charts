<template>
  <div id="app">
    <div class="container">
      <canvas ref="chart" id="myChart" width="600" height="300"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js'

  export default {
    name: 'App',
    mounted() {
      const dataSource = [
        {
          forecast: "-6.00",
          actual: "-1.80",
          timestamp: 1475569800,
          human_date: "2016-10-04 08:30:00"
        },
        {
          forecast: "-3.00",
          actual: "-8.70",
          timestamp: 1478046600,
          human_date: "2016-11-02 08:30:00"
        },
        {
          forecast: "2.00",
          actual: "-12.60",
          timestamp: 1480465800,
          human_date: "2016-11-30 08:30:00"
        },
        {
          forecast: "4.50",
          actual: "7.00",
          timestamp: 1483921800,
          human_date: "2017-01-09 08:30:00"
        },
        {
          forecast: "-1.50",
          actual: "-1.20",
          timestamp: 1485995400,
          human_date: "2017-02-02 08:30:00"
        },
        {
          forecast: "-0.50",
          actual: "1.80",
          timestamp: 1488414600,
          human_date: "2017-03-02 08:30:00"
        },
        {
          forecast: "-1.50",
          actual: "8.30",
          timestamp: 1491183000,
          human_date: "2017-04-03 09:30:00"
        }
      ]
      const labels = dataSource.map(item => {
        return item.human_date.split(' ')[0]
      })
      const linedata = dataSource.map(item => {
        return item.actual
      })
      const ctx = this.$refs.chart
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              data: linedata,
              lineTension: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              borderColor: '#0078eb',
              pointBackgroundColor: '#0078eb'
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
            ]
          }
        }
      })
    }
  }
</script>

<style>
  .container {
    width: 600px;
    margin: 100px auto;
  }
</style>
