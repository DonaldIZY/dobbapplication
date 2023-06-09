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


// Sélectionnez l'élément avec la classe "input-group-append d-lg-none"
const calendarIcon = document.querySelector('.input-group-append.d-lg-none');
// Ajouter un événement de clic à l'icône de calendrier
calendarIcon.addEventListener('click', function() {
  // Sélectionnez l'élément span contenant l'icône de calendrier
  const calendarSpan = calendarIcon.querySelector('span');
  // Sélectionnez l'élément contenant le formulaire de sélection de date
  const datepickerForm = document.querySelector('.d-none.d-lg-flex');
  
  // Ajouter la classe "d-none" à l'élément span contenant l'icône de calendrier
  calendarSpan.classList.add('d-none');
  // Supprimer la classe "d-none" de l'élément contenant le formulaire de sélection de date
  datepickerForm.classList.remove('d-none');
});


// =====================================================================================================================
let defaultCol = {
  width: 90,
  resizable: true,
  flex: 1
};

const colLoiPareto = [
  {
    field: 'client',
    minWidth: 130,
    pinned: 'left',
  },
  {
    headerName: "Secteur d'activité",
    field: 'secteur_activite',
    minWidth: 180,
    filter: true,
  },
  {
    headerName: 'Total ( XOF )',
    field: 'total_montant',
    minWidth: 180,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'Mobile ( XOF )',
    field: 'mobile',
    minWidth: 180,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'Fixe ( XOF )',
    field: 'fixe',
    minWidth: 180,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'ICT ( XOF )',
    field: 'ict',
    minWidth: 180,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'Broadband ( XOF )',
    field: 'broadband',
    minWidth: 180,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
];

const gridOptionsLoiPareto = {
  columnDefs: colLoiPareto,
  rowClass: 'custom',
  rowHeight: 35,
  paginationPageSize: 10,
  pagination: true,
  defaultColDef: defaultCol,
  getRowStyle: params => {
    'use strict';
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
};
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const gridDivLoiPareto = document.querySelector('#grid-gros-client');
  new agGrid.Grid(gridDivLoiPareto, gridOptionsLoiPareto);
});

function onBtnExport() {
  'use strict';
  var params = {
    columnSeparator: ';',
    fileName: 'Mon top client.csv' // nom du fichier de sortie
  };
  gridOptionsLoiPareto.api.exportDataAsCsv(params);
}

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
    axisTick: {show: false},
    axisLine: {show: false},
    axisLabel: {
      textStyle: {
        fontFamily: fontFamily // changer la police en celle HTML
        },
      fontSize: '90%'
      },
    },
  yAxis: {
    axisLabel: {
      textStyle: {
        fontFamily: fontFamily // changer la police en celle HTML
        },
      fontSize: '90%'
    },
  },
  series: [
    {
      type: 'line',
      smooth: true,
      color: color_orange,
      areaStyle: {
        color: color_orange,
        opacity: 0.15
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Max', itemStyle: {color: color_orange}},
          { type: 'min', name: 'Min', itemStyle: {color: color_sombre} }
        ],
        label:{
          formatter: etiquette_format,
        },
        
      },
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
        // formatter: '{b}: {d}% {c}',
        formatter: [
          '{b}: {d}%',
          '{montant|{c}}',
        ].join('\n'),
        rich: {
          montant: {
            color: '#000',
            padding: [0, 0, 10, 0], // Définir un padding supérieur de 10
            fontWeight: 700,
            align: 'center'
          },
        },
        fontSize: '100%',
        fontFamily: fontFamily
      }
    }
  ],
  color: [color_silver, color_orange, color_red, color_blue]
};

// =====================================================================================================================
// GRAPHIQUE : TOP 5 CLIENTS

// var topClients = echarts.init(document.getElementById('dashbordTopClients'), null, {renderer: 'canvas', force: true} );
// var topClientsOption = {
//   grid: grid,
//   // Centrer horizontalement le graphe
//   center: ['50%', '50%'],
//   tooltip: {
//     trigger: 'axis',
//     textStyle: {
//       fontFamily: fontFamily,
//       fontSize: '100%'
//     },
//     axisPointer: {
//       type: 'shadow',
//       crossStyle: {
//         color: '#999'
//       }
//     }
//     },
//   xAxis: {
//     type: 'category',
//     scale: true,
//     axisTick: {show: false},
//     axisLine: {show: false},
//     axisLabel: {
//       textStyle: {
//         fontFamily: fontFamily // changer la police en celle HTML
//         },
//       fontSize: '80%',
//       fontWeight: 600
//       },
//     },
//   yAxis: {
//     type: 'value',
//     min: 0,
//     scale: true,
//     show: true
//     },
//   series: [
//     {
//       name: 'Top 5 clients',
//       type: 'bar',
//       itemStyle: {
//         // borderColor: 'transparent',
//         borderWidth: 1,
//         borderType: 'solid',
//         borderColor: color_blue_1,
//         shadowColor: color_blue_1,
//         shadowBlur: 0.15,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {offset: 0, color: color_blue_2},
//           {offset: 0.5, color: color_blue_1},
//           {offset: 1, color: color_blue}
//         ]),
//         barBorderRadius: 2,
//       },
//       //étiquettes de barres
//       label: {
//         show: true,
//         formatter: etiquette_format,
//         fontWeight: 500,
//         fontSize: '80%',
//         position: 'inside',
//         textStyle: {
//           fontFamily: fontFamily // changer la police en celle HTML
//       },
//         color: '#FFF'
//       },
//     }
//   ],
// };

// =====================================================================================================================
// GRAPHIQUE : TOP 5 PRODUITS

// var topProduits = echarts.init(document.getElementById('dashboardTopProduits'), null, {renderer: 'canvas', force: true} );
// var topProduitsOption = {
//   grid: grid,
//   // Centrer horizontalement le graphe
//   center: ['50%', '50%'],
//   tooltip: {
//     trigger: 'axis',
//     textStyle: {
//       fontFamily: fontFamily,
//       fontSize: '100%'
//     },
//     axisPointer: {
//       type: 'shadow',
//       crossStyle: {
//         color: '#999'
//       }
//     }
//   },
//   yAxis: {
//     type: 'category',
//     scale: true,
//     axisTick: {show: false},
//     axisLine: {show: false},
//     axisLabel: {
//       textStyle: {
//         fontFamily: fontFamily // changer la police en celle HTML
//         },
//       fontSize: '80%',
//       fontWeight: 600
//       },
//     },
//   xAxis: {
//     type: 'value',
//     scale: true,
//     show: true,
//     min: 0
//     },
//   series: [
//     {
//       name: 'Top 5 produits',
//       type: 'bar',
//       itemStyle: {
//         borderWidth: 1,
//         borderType: 'solid',
//         borderColor: color_blue_1,
//         shadowColor: color_blue_1,
//         shadowBlur: 0.15,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {offset: 0, color: color_blue_2},
//           {offset: 0.5, color: color_blue_1},
//           {offset: 1, color: color_blue}
//         ]),
//         barBorderRadius: 2,
//       },
//       //étiquettes de barres
//       label: {
//         show: true,
//         formatter: etiquette_format,
//         fontWeight: 600,
//         fontSize: '80%',
//         position: 'right',
//         textStyle: {
//           fontFamily: fontFamily // changer la police en celle HTML
//       },
//         color: '#000'
//       },
//     }
//   ],
// };

//=========================================================================================================================
// Gérer la responsivité du graphe en fonction de son conteneur
window.addEventListener('resize', function() {
  'use strict';
  // topProduits.resize();
  // var fontSizeTopProduit = document.getElementById('dashboardTopProduits').offsetWidth / 50;
  // topProduits.setOption({
  //   series: [{
  //     label: {
  //       fontSize: fontSizeTopProduit + '%'
  //     }
  //   }],
  //   tooltip: [{
  //     textStyle: {
  //       fontSize: fontSizeTopProduit + '%'
  //     }
  //   }]
  // });
  //
  // topClients.resize();
  // var fontSizeClient = document.getElementById('dashbordTopClients').offsetWidth / 50;
  // topClients.setOption({
  //   series: [{
  //     label: {
  //       fontSize: fontSizeClient + '%'
  //     }
  //   }],
  //   tooltip: [{
  //     textStyle: {
  //       fontSize: fontSizeClient + '%'
  //     }
  //   }]
  // });

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


function separateurMillier(nombre) {
    'use strict';
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


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
      document.getElementById("dashbordPerformGen").style.display = "none";
      document.getElementById("dashboardCaUnivers").style.display = "none";
      // document.getElementById("dashbordTopClients").style.display = "none";
      // document.getElementById("dashboardTopProduits").style.display = "none";
      var loaders = document.getElementsByClassName("loader");
      for (var i = 0; i < loaders.length; i++) {
          loaders[i].style.display = "block";
      }

      if (response.ok) {
        // Récupération des données reçues
        // Rétablissement de l'affichage du contenu
        for (var i = 0; i < loaders.length; i++) {
          loaders[i].style.display = "none";
        }
        document.getElementById("dashbordPerformGen").style.display = "block";
        document.getElementById("dashboardCaUnivers").style.display = "block";
        // document.getElementById("dashbordTopClients").style.display = "block";
        // document.getElementById("dashboardTopProduits").style.display = "block";


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
      // ===========================================================
      if (typeof data.full_name !== 'undefined') {
        document.getElementById("title-name").innerHTML = `Informations générales sur ${data.full_name}`;
      }

      // Option de modification des graphs CA
      caUniversOption.series[0].data = data.univers;
      caUniversOption && caUnivers.setOption(caUniversOption);

       // Boucle pour parcourir tous les éléments de votre tableau
      for (var i = 0; i < data.univers.length; i++) {
          // Récupération du name et du value de chaque élément
          var name = data.univers[i].name.toLowerCase();
          var value = data.univers[i].value / data.pourcent_client;

          document.getElementById(`${name}`).innerHTML = `${separateurMillier(value.toFixed(0))} FCFA`;
      }

    //   ===========================================================
    //   Option de modification des graphs Performance Générale
      const maximum = Math.max(...data.performance.total_montant);
      const minimum = Math.min(...data.performance.total_montant);
      const somme = data.performance.total_montant.reduce((accumulateur, valeur) => accumulateur + valeur, 0);
      const moyenne = data.performance.total_montant.reduce((acc, val) => acc + val) / data.performance.total_montant.length;

      document.getElementById("ca-moyen").innerHTML = `${separateurMillier(moyenne.toFixed(0))} FCFA`;
      document.getElementById("ca-min").innerHTML = `${separateurMillier(minimum)} FCFA`;
      document.getElementById("ca-max").innerHTML = `${separateurMillier(maximum)} FCFA`;
      document.getElementById("ca-cumule").innerHTML = `${separateurMillier(somme)} FCFA`;

      performGeneraleOption.xAxis.data = data.performance.dates;
      performGeneraleOption.series[0].data = data.performance.total_montant;
      performGeneraleOption && performGenerale.setOption(performGeneraleOption);

    //   =============================================================
    // Option de modification des graphs Top 5 des clients
      // topClientsOption.xAxis.data = data.top_client.client;
      // topClientsOption.series[0].data = data.top_client.total_montant;
      // topClientsOption && topClients.setOption(topClientsOption);

    //   ===============================================================
    //   Option de modification des graphs Top 5 des produits
      // topProduitsOption.yAxis.data = data.product.product;
      // topProduitsOption.series[0].data = data.product.ca;
      // topProduitsOption && topProduits.setOption(topProduitsOption);

    //   ===============================================================
      document.getElementById("header-top80").innerHTML = `${data.pourcent_client.toFixed(2)}%`;
      document.getElementById("nb-top80").innerHTML = `${data.nb_client} sur ${data.nb_client_total}`;

      gridOptionsLoiPareto.api.setRowData(data.gros_clients);

    })
    .catch(function (error) {
      // Gestion d'une erreur de requête
      /* jshint ignore:start */
      console.error(error);
      /* jshint ignore:end */
    });
}


// =====================================================================================================================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  getData(defaultStartDate, defaultEndDate);
});