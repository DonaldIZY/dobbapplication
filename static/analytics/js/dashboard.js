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
    data: ['A', 'B', 'C', 'D', 'E']
    },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      smooth: true
    }
  ]
};

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  performGenerale.resize();
  var fontSize = document.getElementById('performGenerale').offsetWidth / 50;
  performGenerale.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    series: [{
      label: {
        fontSize: fontSize + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }]
  });
});

// application des options au graphique
performGeneraleOption && performGenerale.setOption(performGeneraleOption);


// =====================================================================================================================
// GRAPHIQUE : CA GENERE PAR UNIVERS

let caUnivers = echarts.init(document.getElementById('dashboardCaUnivers'), null, {renderer: 'canvas', force: true});
let caUniversOption = {
  responsive: true,
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
      selectedMode: 'single',
      data: [
        {value: 335, name: 'Mobile'},
        {value: 234, name: 'Fixe'},
        {value: 1548, name: 'Broadband'},
        {value: 200, name: 'ICT'}
      ]
    }
  ]
};

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  caUnivers.resize();
  var fontSize = document.getElementById('caUnivers').offsetWidth / 50;
  caUnivers.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    series: [{
      label: {
        fontSize: fontSize + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }]
  });
});

// application des options au graphique
caUnivers.setOption(caUniversOption);


// =====================================================================================================================
// GRAPHIQUE : TOP 5 CLIENTS

var topClients = echarts.init(document.getElementById('dashbordTopClients'), null, {renderer: 'canvas', force: true} );
var topClientsOption = {
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
  xAxis: {
    type: 'category',
    data: ['Client A', 'Client B', 'Client C', 'Client D', 'Client E'],
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
      data: [50, 35, 28, 23, 15],
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
    }
  ]
};

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  topClients.resize();
  var fontSize = document.getElementById('topClients').offsetWidth / 50;
  topClients.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    series: [{
      label: {
        fontSize: fontSize + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }]
  });
});

// application des options au graphique
topClientsOption && topClients.setOption(topClientsOption);


// =====================================================================================================================
// GRAPHIQUE : TOP 5 CLIENTS

var topProduits = echarts.init(document.getElementById('dashboardTopProduits'), null, {renderer: 'canvas', force: true} );
var topProduitsOption = {
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
  yAxis: {
    type: 'category',
    data: ['Produit A', 'Produit B', 'Produit C', 'Produit D', 'Produit E'],
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
        fontWeight: 500,
        fontSize: '80%',
        position: 'inside',
        textStyle: {
          fontFamily: fontFamily // changer la police en celle HTML
      },
        color: '#FFF'
      },
    }
  ]
};

// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  topProduits.resize();
  var fontSize = document.getElementById('topProduits').offsetWidth / 50;
  topProduits.setOption({
    xAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    yAxis: {
      axisLabel: {fontSize: fontSize + '%'}
    },
    series: [{
      label: {
        fontSize: fontSize + '%'
      }
    }],
    legend: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }],
    tooltip: [{
      textStyle: {
        fontSize: fontSize + '%'
      }
    }]
  });
});

// application des options au graphique
topProduitsOption && topProduits.setOption(topProduitsOption);

















// // =====================================================================================================================
// document.addEventListener('DOMContentLoaded', getData("Mobile"));
// // =====================================================================================================================

// document.getElementById('univers').addEventListener('change', function (qualifiedName, value) {
//   // code à exécuter lorsque la valeur change
//   // document.getElementById("header").innerHTML = this.value;

//   let elements = document.getElementsByClassName('graph-title');
//   for (let ele of elements) {
//     ele.innerHTML = this.value;
//   }

//   getData(this.value);
// });

// document.getElementById('select-date').addEventListener('change', function (qualifiedName, value) {
//   console.log(this);
// });
