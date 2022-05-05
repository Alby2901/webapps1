// Initialize the echarts instance based on the prepared dom
var myChart = echarts.init(document.getElementById('main'));

// Specify the configuration items and data for the chart
// var option = {
//   // title: {
//   //   text: 'grafico bilirubina nice'
//   // },
//   tooltip: {},
//   legend: {
//     data: ['']
//   },
//   xAxis: {
//     data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: 'minim',
//       type: 'line',
//       data: [5, 10, 15, 20, 21, 23, 25, 27, 29, 30]
//     },
//     {
//       name: 'max',
//       type: 'line',
//       data: [5, 15, 25, 35, 36, 37, 39, 39, 39, 40]
//     },
//     {
//       name: 'point',
//       type: 'line',
//       data: [, , , , 27, , , , ,]
//     }
//   ]
// };

// values [23] = [ "40", "80", "130", "230" ];

var option = {
  // title: {
  //   text: 'grafico bilirubina nice'
  // },
  xAxis: {
    data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
  },
  yAxis: {},
  series: [
    {
      data: [
        [0, 40],
        [3, 130],
        [14, 130]
      ],
      showSymbol: false,
      type: 'line'
    },
    {
      data: [
        [0, 80],
        [3, 230],
        [14,230]
      ],
      showSymbol: false,
      type: 'line'
    },
    {
      data: [
        [5,160]
      ],
      type: 'scatter',
      color: 'red'
    },

  ]
};

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);