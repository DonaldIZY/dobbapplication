/* jshint esversion: 6 */
let url = window.location.href;
let rich = {
  title: {
    color: '#eee',
    align: 'center'
  },
  abg: {
    backgroundColor: '#333',
    width: '100%',
    align: 'right',
    height: 25,
    borderRadius: [4, 4, 0, 0]
  },
  Sunny: {
    height: 20,
    align: 'left',
  },
  Cloudy: {
    height: 30,
    align: 'left',
  },
  Showers: {
    height: 30,
    align: 'left',
    // color: '#fff',
    backgroundColor: '#4C5058',
    padding: [3, 4],
    borderRadius: 4
  },
  weatherHead: {
    color: '#333',
    height: 24,
    align: 'left'
  },
  hr: {
    borderColor: '#777',
    width: '100%',
    borderWidth: 0.5,
    height: 0
  },
  value: {
    width: 10,
    padding: [0, 20, 0, 10],
    align: 'left'
  },
  valueHead: {
    color: '#333',
    width: 20,
    padding: [0, 20, 0, 30],
    align: 'right'
  },
  rate: {
    width: 40,
    align: 'right',
    padding: [0, 10, 0, 0]
  },
  rateHead: {
    color: '#333',
    width: 40,
    align: 'center',
    padding: [0, 10, 0, 0]
  }
};

// =====================================================================================================================
// GRAPHIQUE : EVOLUTION MOM DE LA CONTRIBUTION (MONITORING)

const domMoMCAF = document.getElementById('ca-top-200');
const chartMoMCAF = echarts.init(domMoMCAF, null, {renderer: 'canvas', force: true});
let optionMoMCAF = {
  grid: grid,
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    },
    formatter: function (params) {
      return `<style>background-color: '#FFF'; color: '#525254FF'</style>
              ${params[0].name} <br/>
              ${params[0].seriesName} : <strong>${params[0].value.toFixed(0)} M </strong> <br/>
              ${params[1].seriesName} : <strong>${params[1].value.toFixed(2)} % </strong> <br/>
              `;
    },
    axisPointer: {
      type: 'shadow',
      crossStyle: {
        color: '#ece9e9'
      }
    }
  },
  legend: {
    data: ['CA top 200', 'Contribution CA Global'],
    align: 'left',
    itemGap: 50,
    textStyle: {
      fontFamily: fontFamily, //Changer la police celle du HTML
      fontSize: '80%',
      fontWeight: 600
    }
  },
  xAxis: [
    {
      type: 'category',
      scale: true,
      axisTick: {show: false},
      axisLine: {show: false},
      axisLabel: {
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
        },
        fontSize: '80%',
        fontWeight: 600
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Parc Actif',
      scale: true,
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%'
      },
      show: false
    },
    {
      type: 'value',
      scale: true,
      name: 'CA Parc Actif',
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%'
      },
      min: 0,
      max: 100,
      show: false
    }
  ],
  series: [
    {
      name: 'CAF YTD (mxof)',
      type: 'bar',
      barWidth: '90%',
      itemStyle: {
        borderWidth: 1,
        borderType: 'solid',
        borderColor: color_blue_1,
        shadowColor: color_blue_1,
        shadowBlur: 0.15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: color_blue_2},
          {offset: 0.5, color: color_blue_1},
          {offset: 1, color: color_blue}
        ]),
        barBorderRadius: 2,
      },
      // étiquettes des barres
      label: {
        show: true,
        fontSize: '80%',
        fontWeight: 500,
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
      },
        position: 'inside',
        color: '#FFF',
        formatter: function (d) {
          'use strict';
          return (d.data.toFixed(0));
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    {
      name: 'Contribution totale au CAF',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          "use strict";
          return value;
        }
      },
      itemStyle: {
        borderColor: color_sombre,
        color: color_sombre,
        borderRadius: 3,
      },
      // étiquettes de la courbe
      label: {
        show: true,
        color: '#dedede',
        position: 'inside',
        backgroundColor: color_sombre,
        fontSize: '80%',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
        },
        borderRadius: 2,
        padding: 3,

        formatter: function (d) {
          'use strict';
          return (d.data.toFixed(0)) + ' %';
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

// =====================================================================================================================
// GRAPHIQUE : CONTRIBUTION PAR UNIVERS 

let chartDomCAUnivers = document.getElementById('ca-univers');
let chartCAUnivers = echarts.init(chartDomCAUnivers, null, {renderer: 'canvas', force: true});
let optionCAUnivers = {
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    },
    formatter: (param) => {
      'use strict';
      return `CA Univers <br/>
              ${param.name}: <strong>${(param.value / 1000000).toFixed(0)} M</strong> 
              <strong>(${param.percent} %)</strong>`;
    },
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


//==============================================================================================================
// GRAPHIQUE : CONTRIBUTION PAR UNIVERS EN BATON

let tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow'
  },
  textStyle: {
    fontFamily: fontFamily,
    fontSize: '100%'
  },
  formatter: function (params) {
    'use strict';
    let tar;
    if (params[1] && params[1].value !== '-') {
      tar = params[1];
    } else {
      tar = params[2];
    }
    return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + '<strong>' + tar.value + '</strong>';
  }
};
let xaxis = {
  type: 'category', 
  axisTick: {show: false}, 
  axisLine: {show: false},
  axisLabel: {
    textStyle: {
      fontFamily: fontFamily, // changer la police en celle HTML
      fontSize: '80%',
      fontWeight: 600
      },
    data: ['Janvier', 'Février', 'Mars', 'Avril']
    }
};
let yaxis = { type: 'value', show: false };

let barWidth = '80%';

let domTest = document.getElementById('test');
let charTest = echarts.init(domTest, null, {renderer: 'canvas', force: true});
let optiontest = {
    tooltip: tooltip,
    grid: grid,
    xAxis: xaxis,
    yAxis: yaxis,
    series: [
      {
        name: 'Placeholder',
        data: ['-', 400, 400, '-'],
        type: 'bar',
        stack: 'Total',
        silent: true,
        barWidth: barWidth,
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
          borderRadius: 3,
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
      },
      {
        name: 'Hausse',
        data: [500, 32, 27, 478],
        type: 'bar',
        stack: 'Total',
        barWidth: barWidth,
        itemStyle: {
          borderWidth: 1,
          borderType: 'solid',
          borderColor: color_blue_1,
          shadowColor: color_blue_1,
          shadowBlur: 0.15,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: color_blue_2},
            {offset: 0.5, color: color_blue_1},
            {offset: 1, color: color_blue}
          ]),
          barBorderRadius: 1,
        },
        label: {
          show: true,
          position: 'top',
          fontSize: '80%',
          fontWeight: 600,
          textStyle: {
              fontFamily: fontFamily // changer la police en celle HTML
            }
        },
      },
    ]
  };
optiontest && charTest.setOption(optiontest);

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  charTest.resize();
  var fontSizeTest = document.getElementById('test').offsetWidth / 50;
  charTest.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeTest + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeTest + '%'}
    },
    series: [{
      label: {
        fontSize: fontSizeTest + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeTest + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeTest + '%'
      }
    }]
  });

  chartMoMCAF.resize();
  var fontSizeMoMCAF = document.getElementById('ca-top-200').offsetWidth / 50;
  chartMoMCAF.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeMoMCAF + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeMoMCAF + '%'}
    },
    series: [{
      label: {
        fontSize: fontSizeMoMCAF + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeMoMCAF + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeMoMCAF + '%'
      }
    }]
  });

  chartCAUnivers.resize();
  var fontSizeCAUnivers = document.getElementById('ca-univers').offsetWidth / 50;
  chartCAUnivers.setOption({
    series: [{
      label: {
        fontSize: fontSizeCAUnivers + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeCAUnivers + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeCAUnivers + '%'
      }
    }]
  });
});


// =====================================================================================================================

// const datePicker = $("#select-date");
// let selectedDate = datePicker.val();

// function onSelectDate(dateText) {
//   const momentDate = moment(dateText, "MM/YYYY");
//   selectedDate = momentDate.toDate();
//   console.log(selectedDate);

//   // Ajouter la date sélectionnée dans les paramètres de la requête POST
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFToken': getCookie('csrftoken')
//     },
//     body: JSON.stringify({
//       param1: 'volume',
//       param2: 'valeur',
//       date: momentDate.format('YYYY-MM-DD')
//     })
//   })
//   .then(function(response) {
//     "use strict";
//     if (response.ok) {
//       // Récupération des données reçues
//       return response.json();
//     } else {
//       // Gestion d'une erreur de requête
//       throw new Error('Error while fetching data');
//     }
//   })

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({
      param1: 'volume',
      param2: 'valeur',
    })
  })
    .then(function(response) {
      "use strict";
      if (response.ok) {
        // Récupération des données reçues
        return response.json();
      } else {
        // Gestion d'une erreur de requête
        throw new Error('Error while fetching data');
      }
    })
  .then(function(data) {
    // Utilisation des données reçues
    console.log(data);

    // Evolution de la Contribution au CA du Top 200
    optionMoMCAF.xAxis[0].data = data.mom_caf.axis;

    // Echelle des axes
    // optionMoMCAF.yAxis[0].min = Math.min(...data.mom_caf.caf);
    // optionMoMCAF.yAxis[0].max = Math.max(...data.mom_caf.caf);
    // optionMoMCAF.yAxis[1].min = Math.min(...data.mom_caf.pourcent);
    // optionMoMCAF.yAxis[1].max = Math.max(...data.mom_caf.pourcent);

    optionMoMCAF.series[0].data = data.mom_caf.caf;
    optionMoMCAF.series[1].data = data.mom_caf.pourcent;
    optionMoMCAF && chartMoMCAF.setOption(optionMoMCAF);


    // ======================= CA Univers ============================
    let total = 0;
    for(let key of Object.getOwnPropertyNames(data.ca_univers)) {
      total = total + data.ca_univers[key].value;
    }

    let listOfColor = [color_orange, color_sombre, color_blue, color_silver];
    let i = 0;
    for(let data_key of Object.getOwnPropertyNames(data.ca_univers))
    {
        const val = data.ca_univers[data_key];
        let pushData = {
          value: val.value,
          name: data_key,
          itemStyle: {color: listOfColor[i]},
          label: {
            formatter: [
              '{title|{b}}{abg|}',
              '{weatherHead| %}{valueHead|evo}',
              '{hr|}',
              '{Sunny|}{value|' + ((val.value / total) * 100).toFixed(0) + '%}{rate|' + val.evo + '%}',
            ].join('\n'),
            backgroundColor: '#eee',
            borderColor: '#777',
            borderWidth: 1,
            borderRadius: 4,
            rich: rich
          }
        };
        optionCAUnivers.series[0].data.push(pushData);
        i = i+1;
    }

    optionCAUnivers && chartCAUnivers.setOption(optionCAUnivers);

  })
  .catch(function(error) {
    // Gestion d'une erreur de requête
     console.error(error);
});
// =====================================================================================================================
