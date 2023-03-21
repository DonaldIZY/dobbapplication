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
              ${params[0].seriesName} : <strong>${params[0].value.toFixed(0)} </strong> <br/>
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
      // scale: true,
      min: 0,
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%'
      },
      show: false
    },
    {
      type: 'value',
      // scale: true,
      min: 0,
      name: 'CA Parc Actif',
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%'
      },
      show: false
    }
  ],
  series: [
    {
      name: 'CAF YTD (mxof)',
      type: 'bar',
      barWidth: '90%',
      tooltip: {
        valueFormatter: function (value) {
          'use strict';
          return value;
        }
      },
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
        formatter: etiquette_format
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
    formatter: function(param) {
      'use strict';
      var value = param.value;
      if (value >= 1000000000) {
          value = (value/1000000000).toFixed(2) + ' Md'; // afficher en milliards
      } else if (value < 1000000000 && value >= 1000000) {
          value = (value/1000000).toFixed(2) + ' M'; // afficher en millions
      } else if (value < 1000000 && value >= 1000){
          value = (value/1000).toFixed(2) + ' K';  // afficher en milliers
      } else {
          value = value; // afficher les valeurs directement
      }
      return 'CA Univers <br/> ' + param.name + ': ' + value + '  (' + param.percent + '%)';
    },
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    },
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data:[],
      label:{
        formatter: '{b}:{d}%',
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

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
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


function getData(startDate, endDate) {
  "use strict";
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      /* jshint ignore:start */
      'X-CSRFToken': getCookie('csrftoken')
      /* jshint ignore:end */
    },
    body: JSON.stringify({
      startDate: startDate,
      endDate: endDate,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        // Récupération des données reçues
        return response.json();
      } else {
        // Gestion d'une erreur de requête
        throw new Error('Error while fetching data');
      }
    })
    .then(function (data) {
      // Utilisation des données reçues
      console.log(data);

      // Evolution de la Contribution au CA du Top 200
      optionMoMCAF.xAxis[0].data = data.mom_caf.axis;

      //Echelle des axes
      // optionMoMCAF.yAxis[0].min = Math.min(...data.mom_caf.caf);
      // optionMoMCAF.yAxis[0].max = Math.max(...data.mom_caf.caf);
      // optionMoMCAF.yAxis[1].min = Math.min(...data.mom_caf.pourcent);
      // optionMoMCAF.yAxis[1].max = Math.max(...data.mom_caf.pourcent);

      optionMoMCAF.series[0].data = data.mom_caf.caf;
      optionMoMCAF.series[1].data = data.mom_caf.pourcent;
      optionMoMCAF && chartMoMCAF.setOption(optionMoMCAF);


      // ======================= CA Univers ============================
      optionCAUnivers.series[0].data = []; // vide les anciennes données
      let total = 0;
      for (let key of Object.getOwnPropertyNames(data.ca_univers)) {
        total = total + data.ca_univers[key].value;
      }

      let listOfColor = [color_silver, color_orange, color_red, color_blue];
      let i = 0;
      for (let data_key of Object.getOwnPropertyNames(data.ca_univers)) {
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
            // formatter: '{b}:{d}%',
            backgroundColor: '#eee',
            borderColor: '#777',
            borderWidth: 1,
            borderRadius: 4,
            rich: rich
          }
        };
        optionCAUnivers.series[0].data.push(pushData);
        i = i + 1;
      }

      optionCAUnivers && chartCAUnivers.setOption(optionCAUnivers);

    })
    .catch(function (error) {
      // Gestion d'une erreur de requête
      console.error(error);
    });
}
// =====================================================================================================================

document.addEventListener('DOMContentLoaded', getData('2022-01-01', '2022-12-01'));
