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

function separateurMillier(nombre) {
    'use strict';
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
  
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
  
//==========================================================================================================================================

var topPerformerByUnivers = echarts.init(document.getElementById('topPerformerByUnivers'), null, {renderer: 'canvas', force: true} );
var topPerformerByUniversOption = {
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
    type: 'value',
    scale: true,
    min: 0,
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
    type: 'category',
    scale: true,
    show: true,
    },
  series: [
    {
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
            position: 'top',
            textStyle: {
            fontFamily: fontFamily // changer la police en celle HTML
        },
            color: '#000'
        },
    }
  ],
};

var topPerformerByProduct = echarts.init(document.getElementById('topPerformerByProduct'), null, {renderer: 'canvas', force: true} );
var topPerformerByProductOption = {
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
    type: 'value',
    scale: true,
    min: 0,
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
    type: 'category',
    scale: true,
    show: true,
    },
  series: [
    {
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
            position: 'top',
            textStyle: {
            fontFamily: fontFamily // changer la police en celle HTML
        },
            color: '#000'
        },
    }
  ],
};

//======================================================================================================================
window.addEventListener('resize', function() {
    'use strict';
    topPerformerByProduct.resize();
    var fontPerformerByProduct = document.getElementById('dashboardTopProduits').offsetWidth / 50;
    topPerformerByProduct.setOption({
      series: [{
        label: {
          fontSize: fontPerformerByProduct + '%'
        }
      }],
      tooltip: [{
        textStyle: {
          fontSize: fontPerformerByProduct + '%'
        }
      }]
    });

    topPerformerByUnivers.resize();
    var fontPerformerByUnivers = document.getElementById('dashboardTopProduits').offsetWidth / 50;
    topPerformerByUnivers.setOption({
      series: [{
        label: {
          fontSize: fontPerformerByUnivers + '%'
        }
      }],
      tooltip: [{
        textStyle: {
          fontSize: fontPerformerByUnivers + '%'
        }
      }]
    });
});

// =====================================================================================================================
let defaultCol = {
  width: 90,
  resizable: true,
  flex: 1
};

// ============================================== client entrant et sortant ============================================
const colUnivers = [
  { headerName: 'Univers', field: 'univers', minWidth: 130, pinned: 'left'},
  {
    headerName: 'Nb Client',
    field: 'nb_client',
    minWidth: 120,
    type: 'numericColumn',
  },
  {
    headerName: 'CA Cumulé ( XOF )',
    field: 'ca_cumule',
    minWidth: 180,
    type: 'numericColumn',
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'CA Moyen ( XOF )',
    field: 'ca_moyen',
    minWidth: 180,
    type: 'numericColumn',
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
];

const gridOptionsRecapUnivers = {
  columnDefs: colUnivers,
  rowHeight: 50,
  rowClass: 'custom',
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
  const gridDivRecapUnivers = document.querySelector('#grid-recap-univers');
  new agGrid.Grid(gridDivRecapUnivers, gridOptionsRecapUnivers);
});



const colProduit = [
  { headerName: 'Univers', field: 'groupe_produit', minWidth: 120, pinned: 'left'},
  {
    headerName: 'Nb Client',
    field: 'nb_client',
    minWidth: 120,
    type: 'numericColumn',
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'CA Cumulé ( XOF )',
    field: 'ca_cumule',
    minWidth: 180,
    type: 'numericColumn',
    valueFormatter: function(params) {
      'use strict';
      return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  {
    headerName: 'CA Moyen ( XOF )',
    field: 'ca_moyen',
    minWidth: 180,
    type: 'numericColumn',
    // valueFormatter: function(params) {
    //   'use strict';
    //   return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // }
  },
];

const gridOptionsRecapProduit = {
  columnDefs: colProduit,
  rowHeight: 30,
  rowClass: 'custom',
  defaultColDef: defaultCol,
  getRowStyle: params => {
    "use strict";
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
};
document.addEventListener('DOMContentLoaded', () => {
    const gridDivRecapProduit = document.querySelector('#grid-recap-produit');
    new agGrid.Grid(gridDivRecapProduit, gridOptionsRecapProduit);
});

// =====================================================================================================================



function getData(args) {
  "use strict";

  var url = window.location.href;
  var body = JSON.stringify(args.body);

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      /* jshint ignore:start */
      'X-CSRFToken': getCookie('csrftoken')
      /* jshint ignore:end */
    },
    body: body,
  })
    .then(function (response) {
      document.getElementById("topPerformerByUnivers").style.display = "none";
      document.getElementById("topPerformerByProduct").style.display = "none";
      var loaders = document.getElementsByClassName("loader");
      for (var i = 0; i < loaders.length; i++) {
          loaders[i].style.display = "block";
      }

      if (response.ok) {
        for (var i = 0; i < loaders.length; i++) {
          loaders[i].style.display = "none";
        }
        document.getElementById("topPerformerByUnivers").style.display = "block";
        document.getElementById("topPerformerByProduct").style.display = "block";

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
      console.log(fontFamily);
      console.log(data);
      /* jshint ignore:end */
      // ===============================================================================================================
      if (typeof data.recap_univers !== 'undefined') {
        // table_univers.rows().remove().draw();
        // table_univers.rows.add(data.recap_univers).draw(true);

        gridOptionsRecapUnivers.api.setRowData(data.recap_univers);
      }

      if (typeof data.recap_product !== 'undefined') {
        // table_produit.rows().remove().draw();
        // table_produit.rows.add(data.recap_product).draw(true);

        gridOptionsRecapProduit.api.setRowData(data.recap_product);
      }

      //   =============================================================================================================
      // Option de modification des graphs Top performers par univers
      if (typeof data.top_performers_univers !== 'undefined') {
        topPerformerByUniversOption.xAxis.data = data.top_performers_univers.commerciaux;
        topPerformerByUniversOption.series[0].data = data.top_performers_univers.total_montant;
        topPerformerByUniversOption && topPerformerByUnivers.setOption(topPerformerByUniversOption);
      }

      //   =============================================================================================================
      // Option de modification des graphs Top performers par univers
      if (typeof data.top_performers_product !== 'undefined') {
        topPerformerByProductOption.xAxis.data = data.top_performers_product.commerciaux;
        topPerformerByProductOption.series[0].data = data.top_performers_product.total_montant;
        topPerformerByProductOption && topPerformerByProduct.setOption(topPerformerByProductOption);
      }
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
  // getData('Mobile', 'ADSL', defaultStartDate, defaultEndDate);
  let univers = document.getElementById('univers').value;
  let product = document.getElementById('product').value;

  getData({
    body: {
      univers: univers,
      product: product,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    },
  });
});
// =====================================================================================================================

document.getElementById('univers').addEventListener('change', function () {
  'use strict';

  var startDate = $('#start_date').datepicker('getDate');
  var endDate = $('#end_date').datepicker('getDate');

  if (startDate !== null && endDate !== null) {
    startDate = startDate.toISOString().slice(0,10);
    startDate = `${endDate.slice(0,8)}01`;
    endDate = endDate.toISOString().slice(0,10);
    if (new Date(startDate) > new Date(endDate)) {
      getData({
        body: {
          univers: this.value,
          startDate: startDate,
          endDate: endDate,
        },
      });
    }
  }
  else {
    getData({
    body: {
      univers: this.value,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    },
  });
  }

});

document.getElementById('product').addEventListener('change', function () {
  'use strict';

  var startDate = $('#start_date').datepicker('getDate');
  var endDate = $('#end_date').datepicker('getDate');

  if (startDate !== null && endDate !== null) {
    startDate = startDate.toISOString().slice(0,10);
    startDate = `${endDate.slice(0,8)}01`;
    endDate = endDate.toISOString().slice(0,10);
    if (new Date(startDate) > new Date(endDate)) {
      getData({
        body: {
          product: this.value,
          startDate: startDate,
          endDate: endDate,
        },
      });
    }
  }
  else {
    getData({
    body: {
      product: this.value,
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    },
  });
  }

});



// ======================================== Requête pour obtenir les données ===========================================
