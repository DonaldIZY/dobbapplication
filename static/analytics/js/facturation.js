/* jshint esversion: 6 */
function evoFormat(val) {
  'use strict';
  if(val === 0) {
    val = '-';
  }
  return val;
}

function setColor(color) {
  'use strict';
  return {
    color: function (params) {
      if (params.dataIndex === 0) {
        return '#7b7e7e';
      } else {
        return color;
      }
    }
  };
}

let url = window.location.href;
/* jshint ignore:start */
console.log(url);
/* jshint ignore:end */

// =====================================================================================================================
// Options Evo facture
let domParcActif = document.getElementById('facture');
let chartParcActif = echarts.init(domParcActif);
let optionParcActif = {
  responsive: true,
  grid: grid,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true}
    }
  },
  legend: {
    data: ['Parc Actif', 'CA Parc Actif'],
    align: 'left',
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {show: false},
      axisLine: {show: false},
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Parc Actif',
      axisLabel: {formatter: '{value}'},
      interval: 50,
      show: false
    },
    {
      type: 'value',
      interval: 100,
      name: 'CA Parc Actif',
      axisLabel: {formatter: '{value} M'},
      show: false
    }
  ],
  series: [
    {
      name: 'Parc Actif',
      type: 'bar',
      barWidth: '70%',
      tooltip: {
        valueFormatter: function (value) {
          'use strict';
          return value;
        }
      },
      itemStyle: {
        borderColor: 'transparent',
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: '#b4b6b6'},
          {offset: 0.5, color: '#a1a1a1'},
          {offset: 1, color: color_silver}
        ]),
        barBorderRadius: 3,
      },
      label: {
        show: true,
        fontWeight: 900,
        position: 'inside',
        color: '#FFF',
      },
    },
    {
      name: 'CA Parc Actif',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          "use strict";
          return value + ' M FCFA';
        }
      },
      itemStyle: {
        borderColor: color_sombre,
        color: color_sombre,
        borderRadius: 3,
      },
      label: {
        show: true,
        color: '#dedede',
        position: 'inside',
        backgroundColor: color_sombre,
        fontWeight: 900,
        borderRadius: 2,
        padding: 3,
      },
    }
  ]
};

// =====================================================================================================================
// Option evolution de la facturation
let tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow'
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
let legende = {
  data: [
    {
      name: 'Hausse',
      itemStyle: { color: color_red}
    },
    {
      name: 'Baisse',
      itemStyle: { color: '#1c571'}
    }
  ]
};
let xaxis = { type: 'category', axisTick: {show: false}, axisLine: {show: false}, };
let yaxis = { type: 'value', show: false };

let barWidth = '50%';

let domFacturationYTD = document.getElementById('evo');
let chartYTD = echarts.init(domFacturationYTD);
let optionFacturationYTD = {
      tooltip: tooltip,
      legend: legende,
      grid: grid,
      xAxis: xaxis,
      yAxis: yaxis,
      series: [
        {
          name: 'Placeholder',
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
          name: 'Baisse',
          type: 'bar',
          stack: 'Total',
          barWidth: barWidth,
          itemStyle: {
            borderColor: 'transparent',
            // ...setColor(color_red),
            color: color_red,
            borderRadius: 3,
          },
          label: {
            show: true,
            position: 'bottom'
          },
        },
        {
          name: 'Hausse',
          type: 'bar',
          stack: 'Total',
          barWidth: barWidth,
          itemStyle: {
            borderColor: 'transparent',
            // définir la couleur du graph
            // ...setColor(color_green),
            color: color_green,
            borderRadius: 3,
          },
          label: {
            show: true,
            position: 'top',
            fontWeight: 900,
          },
        },
      ]
    };

// =====================================================================================================================
let domEvoMoM = document.getElementById('diff-facturation');
let chartEvoMoM = echarts.init(domEvoMoM);
let optionEvoMoM = {
    grid: grid,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: legende,
    xAxis: xaxis,
    yAxis: yaxis,
    series: [
      {
        name: 'Placeholder',
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
        name: 'Baisse',
        type: 'bar',
        stack: 'Total',
        barWidth: barWidth,
        itemStyle: {
          borderColor: 'transparent',
          // ...setColor(color_red),
          color: color_red,
          borderRadius: 3,
        },
        label: {
          show: true,
          position: 'inside'
        },
      },
      {
        name: 'Hausse',
        type: 'bar',
        stack: 'Total',
        barWidth: barWidth,
        itemStyle: {
          borderColor: 'transparent',
          // ...setColor(color_green),
          color: color_green,
          borderRadius: 3,
        },
        label: {
          show: true,
          position: 'inside'
        },
      }
    ]
  };

// =====================================================================================================================
function getData(univers) {
  "use strict";
  // let formData = new FormData();
  // formData.append('univers', univers);
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      /* jshint ignore:start */
      'X-CSRFToken': getCookie('csrftoken')
      /* jshint ignore:end */
    },
    body: JSON.stringify({univers: univers})
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
      /* jshint ignore:start */
      console.log(data);
      /* jshint ignore:end */

      // =================================================================================================================
      // Facturation Parc Atif et CA Parc Atif
      optionParcActif.xAxis[0].data = data.volume.date;
      optionParcActif.series[0].data = data.volume.values;
      optionParcActif.series[1].data = data.ca.values;

      // Echelle des axes
      optionParcActif.yAxis[0].min = Math.min(...data.volume.values) - 1000;
      optionParcActif.yAxis[0].max = Math.max(...data.volume.values) + 100;
      optionParcActif.yAxis[1].min = Math.min(...data.ca.values) - 100;
      optionParcActif.yAxis[1].max = Math.max(...data.ca.values) + 10;

      optionParcActif && chartParcActif.setOption(optionParcActif);

      // =================================================================================================================
      // Evolution de la facturation
      let evoBaisseYTD = data.evo_ytd.baisse.map(evoFormat);
      let evoHausseYTD = data.evo_ytd.hausse.map(evoFormat);
      optionFacturationYTD.xAxis.data = data.evo_ytd.axis;
      optionFacturationYTD.series[0].data = data.evo_ytd.val;
      optionFacturationYTD.series[1].data = evoBaisseYTD;
      optionFacturationYTD.series[2].data = evoHausseYTD;
      optionFacturationYTD && chartYTD.setOption(optionFacturationYTD);

      // =================================================================================================================
      optionEvoMoM.xAxis.data = data.evo_diff.axis;
      optionEvoMoM.series[0].data = data.evo_diff.trans;
      optionEvoMoM.series[1].data = data.evo_diff.baisse.map(evoFormat);
      optionEvoMoM.series[2].data = data.evo_diff.hausse.map(evoFormat);
      optionEvoMoM && chartEvoMoM.setOption(optionEvoMoM);

    })
    .catch(function (error) {
      // Gestion d'une erreur de requête
      /* jshint ignore:start */
      console.error(error);
      /* jshint ignore:end */
    });
}

// =====================================================================================================================
document.addEventListener('DOMContentLoaded', getData("Mobile"));
// =====================================================================================================================

document.getElementById('univers').addEventListener('change', function (qualifiedName, value) {
  // code à exécuter lorsque la valeur change
  // document.getElementById("header").innerHTML = this.value;

  let elements = document.getElementsByClassName('graph-title');
  for (let ele of elements) {
    ele.innerHTML = this.value;
  }

  getData(this.value);
});

document.getElementById('select-date').addEventListener('change', function (qualifiedName, value) {
  console.log(this);
});
