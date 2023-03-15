/* jshint esversion: 6 */

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
// GRAPHIQUE : PERFORMANCE GENERALE

var performGenerale = echarts.init(document.getElementById('dashbordPerformGen'), null, {renderer: 'canvas', force: true} );
var performGeneraleOption = {
  grid: grid,
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
      }
    },
  xAxis: {
    },
  yAxis: {},
  series: [
    {
      type: 'line',
      smooth: true,
      label:{
        formatter: etiquette_format,
      }
    }
  ]
};

// =====================================================================================================================
// GRAPHIQUE : CA GENERE PAR UNIVERS

let caUnivers = echarts.init(document.getElementById('dashboardCaUnivers'), null, {renderer: 'canvas', force: true});
let caUniversOption = {
  responsive: true,
  grid: grid,
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
          var value = params.value;
          if (value >= 1000000000) {
              value = (value/1000000000).toFixed(2) + ' Md'; // afficher en milliards
          } else if (value < 1000000000 && value >= 1000000) {
              value = (value/1000000).toFixed(2) + ' M'; // afficher en millions
          } else if (value < 1000000 && value >= 1000){
              value = (value/1000).toFixed(2) + ' K';  // afficher en milliers
          } else {
              value = value; // afficher les valeurs directement
          }
          return params.name + ': ' + value + ' (' + params.percent + '%)';
        },
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    }
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      selectedMode: 'single',
      label:{
        formatter: '{b}: {d}%',
      }
    }
  ],
  color: [color_silver, color_orange, color_red, color_blue]
};

// =====================================================================================================================
// GRAPHIQUE : TOP 5 CLIENTS

var topClients = echarts.init(document.getElementById('dashbordTopClients'), null, {renderer: 'canvas', force: true} );
var topClientsOption = {
  grid: grid,
  // Centrer horizontalement le graphe
  center: ['50%', '50%'],
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
  xAxis: {
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
      },
    },
  yAxis: {
    type: 'value',
    scale: true,
    show: false
    },
  series: [
    {
      name: 'Top 5 clients',
      type: 'bar',
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
        formatter: etiquette_format,
        fontWeight: 500,
        fontSize: '80%',
        position: 'inside',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
      },
        color: '#FFF'
      },
    }
  ],
};

// =====================================================================================================================
// GRAPHIQUE : TOP 5 PRODUITS

var topProduits = echarts.init(document.getElementById('dashboardTopProduits'), null, {renderer: 'canvas', force: true} );
var topProduitsOption = {
  grid: grid,
  // Centrer horizontalement le graphe
  center: ['50%', '50%'],
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
  yAxis: {
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
      },
    },
  xAxis: {
    type: 'value',
    scale: true,
    show: false
    },
  series: [
    {
      name: 'Top 5 produits',
      type: 'bar',
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
      //étiquettes de barres
      label: {
        show: true,
        formatter: etiquette_format,
        fontWeight: 600,
        fontSize: '80%',
        position: 'right',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
      },
        color: '#000'
      },
    }
  ],
};


// =====================================================================================================================
// GRAPHIQUE : ZOOM 20/80

 // Initialiser le diagramme avec echarts
 var zoomGraph = echarts.init(document.getElementById('dashboardZoom'), null, {renderer: 'canvas', force: true});

 // Définir les données pour chaque entrée Y
 var data1 = [120, 200, 150, 80, 70, 56, 54, 23, 15]; //Mobile
 var data2 = [80, 90, 100, 60, 50, 56, 54, 23, 15];   //Fixe
 var data3 = [50, 70, 60, 40, 30, 52, 34, 13, 75];    //Broadband
 var data4 = [30, 40, 50, 20, 10, 8, 14, 10, 25];    //ICT

 // Définir les étiquettes pour l'axe X (clients)
 var labels = ['Client1', 'Client30', 'Client19', 'Client68', 'Client109', 'Client3', 'Client295', 'Client968', 'Client7109'];

 // Définir les options pour le diagramme
 var zoomOption = {
    center: ['50%', '50%'],
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
        data: ['Mobile', 'Fixe', 'Broadband', 'ICT'] //univers
    },
    xAxis: {
        type: 'category',
        data: labels
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Mobile',
            type: 'bar',
            stack: 'total',
            data: data1,
            color: color_blue
        },
        {
            name: 'Fixe',
            type: 'bar',
            stack: 'total',
            data: data2,
            color: color_orange
        },
        {
            name: 'Broadband',
            type: 'bar',
            stack: 'total',
            data: data3,
            color: color_silver
        },
        {
            name: 'ICT',
            type: 'bar',
            stack: 'total',
            data: data4,
            color: color_red
        },
    ]
 };
 // Appliquer les options au diagramme
 zoomGraph.setOption(zoomOption);


//=========================================================================================================================
// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  'use strict';
  topProduits.resize();
  var fontSizeTopProduit = document.getElementById('dashboardTopProduits').offsetWidth / 50;
  topProduits.setOption({
    series: [{
      label: {
        fontSize: fontSizeTopProduit + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeTopProduit + '%'
      }
    }]
  });

  topClients.resize();
  var fontSizeClient = document.getElementById('dashbordTopClients').offsetWidth / 50;
  topClients.setOption({
    series: [{
      label: {
        fontSize: fontSizeClient + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizeClient + '%'
      }
    }]
  });

  caUnivers.resize();
  var fontSizeCaUnivers = document.getElementById('dashboardCaUnivers').offsetWidth / 50;
  caUnivers.setOption({
    tooltip: [{
      textStyle: {
        fontSize: fontSizeCaUnivers + '%'
      }
    }]
  });

  performGenerale.resize();
  var fontSizePerform = document.getElementById('dashbordPerformGen').offsetWidth / 50;
  performGenerale.setOption({
    series: [{
      label: {
        fontSize: fontSizePerform + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSizePerform + '%'
      }
    }]
  });
});


// =====================================================================================================================
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
    })
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

      caUniversOption.series[0].data = data.univers;
      caUniversOption && caUnivers.setOption(caUniversOption);

    //   ===========================================================
      performGeneraleOption.xAxis.data = data.performance.dates;
      performGeneraleOption.series[0].data = data.performance.total_montant;
      performGeneraleOption && performGenerale.setOption(performGeneraleOption);

    //   =============================================================

      topClientsOption.xAxis.data = data.top_client.client;
      topClientsOption.series[0].data = data.top_client.total_montant;
      topClientsOption && topClients.setOption(topClientsOption);

    //   ===============================================================
      topProduitsOption.yAxis.data = data.product.product;
      topProduitsOption.series[0].data = data.product.ca;
      topProduitsOption && topProduits.setOption(topProduitsOption);

    })
    .catch(function (error) {
      // Gestion d'une erreur de requête
      /* jshint ignore:start */
      console.error(error);
      /* jshint ignore:end */
    });
}

// =====================================================================================================================
document.addEventListener('DOMContentLoaded', getData('2022-01-01', '2022-06-01'));