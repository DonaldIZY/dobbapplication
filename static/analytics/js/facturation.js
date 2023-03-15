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
// GRAPHIQUE : EVOLUTION DU PARC ACTIF ET DU CA 

let domParcActif = document.getElementById('facture');
let chartParcActif = echarts.init(domParcActif);

let optionParcActif = {
  responsive: true,
  grid: grid,
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    },
    axisPointer: {
      type: 'shadow',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: ['Parc Actif', 'CA Parc Actif'],
    align: 'left',
    itemGap: 30,
    textStyle: {
      fontFamily: fontFamily, //Changer la police celle du HTML
      fontSize: '80%',
      fontWeight: 600
    }
  },
  xAxis: [
    {
      type: 'category',
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
      axisZero: true, // définir l'option "yAxis.axisZero" pour mettre à la même origine les entrées Y
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%',  
      },
      show: false
    },
    {
      type: 'value',
      name: 'CA Parc Actif',
      scale: true,
      axisZero: true, // définir l'option "yAxis.axisZero" pour mettre à la même origine les entrées Y
      axisLabel: {
        formatter: '{value}',
        fontSize: '80%',
      },
      show: false
    }
  ],
  series: [
    {
      name: 'Parc Actif',
      type: 'bar',
      barWidth: '90%',
      // barCategoryGap: '10%', // espacement entre les barres
      // barGap: '40%', // espacement entre les séries
      tooltip: {
        valueFormatter: function (value) {
          'use strict';
          return value;
        }
      },
      yAxisIndex:0,
      itemStyle: {
        // borderColor: 'transparent',
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
      //étiquettes de barres
      label: {
        show: true,
        fontWeight: 500,
        fontSize: '80%',
        position: 'inside',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
      },
        color: '#FFF'
      },
    },
    {
      name: 'CA Parc Actif',
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          "use strict";
          return value + 'F';
        }
      },
      yAxisIndex: 1,
      itemStyle: {
        borderColor: color_sombre,
        color: color_sombre,
        borderRadius: 3,
      },
      //étiquettes de la courbe
      label: {
        show: true,
        formatter: etiquette_format,
        color: '#dedede',
        position: 'inside',
        backgroundColor: color_sombre,
        fontSize: '80%',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
        },
        borderRadius: 2,
        padding: 3,
      },
    }
  ]
};


// =====================================================================================================================
// Options de statut de la clientèle
let tooltip = {
  trigger: 'axis',
  textStyle: {
    fontFamily: fontFamily,
    fontSize: '100%'
  },
  axisPointer: {
    type: 'shadow',
    crossStyle: {
      color: '#999'
    }
  }
};
  
  // formatter: function (params) {
  //   'use strict';
  //   let tar;
  //   if (params[1] && params[1].value !== '-') {
  //     tar = params[1];
  //   } else {
  //     tar = params[2];
  //   }
  //   return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + '<strong>' + tar.value + '</strong>';
  // }

let legende = {
  data: [
    {
      name: 'Hausse',
      textStyle: {
        fontFamily: fontFamily, //Changer la police celle du HTML
        fontSize: '80%',
        fontWeight: 600
      },
      itemStyle: { color: color_blue}
    },
    {
      name: 'Baisse',
      textStyle: {
        fontFamily: fontFamily, //Changer la police celle du HTML
        fontSize: '80%',
        fontWeight: 600
      },
      itemStyle: { color: color_red}
    }
  ],
  itemGap: 30,
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
    }
};
let yaxis = { type: 'value', show: false };

let barWidth = '80%';

// GRAPHIQUE : STATUT DE LA CLIENTELE

let domFacturationMoM = document.getElementById('evo');
let chartMoM = echarts.init(domFacturationMoM, null, {renderer: 'canvas', force: true});

let optionFacturationMoM = {
      //tooltip: tooltip,
      legend: legende,
      grid: grid,
      tooltip : tooltip,
      // Centrer horizontalement le graphe
      center: ['50%', '50%'],
      xAxis: xaxis,
      yAxis: yaxis,
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          silent: true,
          barWidth: barWidth,
          tooltip: {
            valueFormatter: function (value) {
              'use strict';
              return value;
            },
          },
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
            borderWidth: 1,
            borderType: 'solid',
            borderColor: color_red_1,
            shadowColor: color_red_1,
            shadowBlur: 0.15,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: color_red},
              {offset: 0.5, color: color_red_1},
              {offset: 1, color: color_red_2}
            ]),
            barBorderRadius: 1,
          },
          label: {
            show: true,
            formatter: etiquette_format,
            fontSize: '80%',
            fontWeight: 600,
            textStyle: {
              fontFamily: fontFamily // changer la police en celle HTML
            },
            position: 'bottom',
          },
        },
        {
          name: 'Hausse',
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
            formatter: etiquette_format,
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


//========================================================================================================
// GRAPHIQUE : STATUT DE LA CLIENTELE YTD
let domFacturationYTD = document.getElementById('evo-ytd');
let chartYTD = echarts.init(domFacturationYTD, null, {renderer: 'canvas', force: true});

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
            borderWidth: 1,
            borderType: 'solid',
            borderColor: color_red_1,
            shadowColor: color_red_1,
            shadowBlur: 0.15,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: color_red},
              {offset: 0.5, color: color_red_1},
              {offset: 1, color: color_red_2}
            ]),
            barBorderRadius: 1,
          },
          label: {
            show: true,
            formatter: etiquette_format,
            fontSize: '80%',
            fontWeight: 600,
            textStyle: {
              fontFamily: fontFamily // changer la police en celle HTML
            },
            position: 'bottom',
          },
        },
        {
          name: 'Hausse',
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
            formatter: etiquette_format,
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

// =====================================================================================================================
// GRAPHIQUE : FLUCTUATIONS DU CA

let domEvoMoM = document.getElementById('diff-facturation');
let chartEvoMoM = echarts.init(domEvoMoM, null, {renderer: 'canvas', force: true});
let optionEvoMoM = {
    grid: grid,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontFamily: fontFamily,
        fontSize: '100%'
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
          borderRadius: 1,
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
          borderWidth: 1,
          borderType: 'solid',
          borderColor: color_red_1,
          shadowColor: color_red_1,
          shadowBlur: 0.15,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: color_red},
            {offset: 0.5, color: color_red_1},
            {offset: 1, color: color_red_2}
          ]),
          barBorderRadius: 1,
        },
        label: {
          show: true,
          formatter: etiquette_format,
          position: 'bottom',
          fontSize: '80%',
          fontWeight: 600,
          textStyle: {
              fontFamily: fontFamily // changer la police en celle HTML
            }
        },
      },
      {
        name: 'Hausse',
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
          formatter: etiquette_format,
          position: 'top',
          fontSize: '80%',
          fontWeight: 600,
          textStyle: {
              fontFamily: fontFamily // changer la police en celle HTML
            }
        },
      }
    ]
  };

// =====================================================================================================================

function getData(univers, startDate, endDate) {
  "use strict";

  console.log(startDate);
  console.log(endDate);

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
      univers: univers,
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
      /* jshint ignore:start */
      console.log(data);
      /* jshint ignore:end */

      // =================================================================================================================
      // Facturation Parc Atif et CA Parc Atif
      optionParcActif.xAxis[0].data = data.volume.date;
      optionParcActif.series[0].data = data.volume.values;
      optionParcActif.series[1].data = data.ca.values;

      // Echelle des axes
      //optionParcActif.yAxis[0].min = Math.min(...data.volume.values)-100;
      //optionParcActif.yAxis[0].max = Math.max(...data.volume.values) + 10;
      //optionParcActif.yAxis[1].min = Math.min(...data.ca.values);
      //optionParcActif.yAxis[1].max = Math.max(...data.ca.values);

      optionParcActif && chartParcActif.setOption(optionParcActif);

      // =================================================================================================================
      // Evolution de la facturation MoM
      let evoBaisseMoM = data.evo_mom.baisse.map(evoFormat);
      let evoHausseMoM = data.evo_mom.hausse.map(evoFormat);
      optionFacturationMoM.xAxis.data = data.evo_mom.axis;
      optionFacturationMoM.series[0].data = data.evo_mom.val;
      optionFacturationMoM.series[1].data = evoBaisseMoM;
      optionFacturationMoM.series[2].data = evoHausseMoM;
      optionFacturationMoM && chartMoM.setOption(optionFacturationMoM);

      // Evolution de la facturation YTD
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
document.addEventListener('DOMContentLoaded', getData('Mobile', '2022-01-01', '2022-06-01'));
// =====================================================================================================================

document.getElementById('univers').addEventListener('change', function (qualifiedName, value) {
  // code à exécuter lorsque la valeur change
  // document.getElementById("header").innerHTML = this.value;

  let elements = document.getElementsByClassName('graph-title');
  for (let ele of elements) {
    ele.innerHTML = this.value;
  }
  var startDate = $('#start_date').datepicker('getDate').toISOString().slice(0,10);
  var endDate = $('#end_date').datepicker('getDate').toISOString().slice(0,10);

  getData(this.value, startDate, endDate);
});

window.addEventListener('resize', function() {
  'use strict';

  chartParcActif.resize();
  var fontSizeParc = document.getElementById('facture').offsetWidth / 50;
  chartParcActif.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeParc + '%'},
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeParc + '%'},
    },
    series: [{
      label: {
        fontSize: fontSizeParc + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeParc + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeParc + '%'
      }
    }],
  });

  chartMoM.resize();
  var fontSizeMoM = document.getElementById('evo').offsetWidth / 50;
  chartMoM.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeMoM + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeMoM + '%'}
    },
    series: [{
      label: {
        fontSize: fontSizeMoM + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeMoM + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeMoM + '%'
      }
    }]
  });

  chartYTD.resize();
  var fontSizeYTD = document.getElementById('evo-ytd').offsetWidth / 50;
  chartYTD.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeYTD + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeYTD + '%'}
    },
    series: [{
      label: {
        fontSize: fontSizeYTD + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeYTD + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeYTD + '%'
      }
    }]
  });

  chartEvoMoM.resize();
  var fontSizeEvo = document.getElementById('diff-facturation').offsetWidth / 50;
  chartEvoMoM.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSizeEvo + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSizeEvo + '%'}
    },
    series: [{
      label: {
        fontSize: fontSizeEvo + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSizeEvo + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeEvo + '%'
      }
    }]
  });
});
