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

let etiquette_format = function (params) {
  var value = params.value;
  if (value >= 1000000000) {
      return (Math.round(value/1000000000)) + ' Md'; // afficher en milliards
  } else if (value < 1000000000 && value >= 1000000) {
      return (Math.round(value/1000000)) + ' M'; // afficher en millions
  } else if (value < 1000000 && value >= 100000){
      return (Math.round(value/1000)) + ' k'; // afficher les valeurs directement
  } else {
      return value;
  }
};


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
    textStyle: {
      fontFamily: fontFamily,
      fontSize: '100%'
    }
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      selectedMode: 'single'
    }
  ]
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
      data: [15, 17, 18, 20, 25],
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

      caUniversOption.series[0].data = data.univers;
      caUniversOption && caUnivers.setOption(caUniversOption);

    //   ===========================================================
      performGeneraleOption.xAxis.data = data.performance.client;
      performGeneraleOption.series[0].data = data.performance.total_montant;
      performGeneraleOption && performGenerale.setOption(performGeneraleOption);

    //   =============================================================

      topClientsOption.xAxis.data = data.performance.client;
      topClientsOption.series[0].data = data.performance.total_montant;
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
document.addEventListener('DOMContentLoaded', getData("Mobile"));