let defaultCol = {
  width: 90,
  resizable: true,
  flex: 1
};

const colTop200 = [
  {
    field: 'client',
    minWidth: 130,
    pinned: 'left',
  },
  {
    field: 'segment',
    minWidth: 150,
    filter: true,
  },
  {
    field: 'commercial',
    minWidth: 150,
    filter: true,
  },
  {
    headerName: 'Mobile ( % )',
    field: 'mobile',
    minWidth: 120,
    type: 'numericColumn',
  },
  {
    headerName: 'Fixe ( % )',
    field: 'fixe',
    minWidth: 120,
    type: 'numericColumn',
  },
  {
    headerName: 'ICT ( % )',
    field: 'ict',
    minWidth: 120,
    type: 'numericColumn',
  },
  {
    headerName: 'Broadband ( % )',
    field: 'broadband',
    minWidth: 150,
    type: 'numericColumn',
    valueFormatter: function(params) {
      'use strict';
      return params.value + ' %';
    }
  },
  {
    field: 'rang',
    minWidth: 100,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return parseInt(params.value);
    }
  },
  {
    headerName: 'Rang Préc',
    field: 'rang_prec',
    minWidth: 120,
    type: 'numericColumn',
    sortable: true,
    valueFormatter: function(params) {
      'use strict';
      return parseInt(params.value);
    }
  },
];

const gridOptionsTop200 = {
  columnDefs: colTop200,
  rowClass: 'custom',
  rowClassRules: {
    "row-vert-ciel": function(params) { return params.data.rang_prec > 200; },
  },
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
  const gridDivTop200 = document.querySelector('#grid-top-200');
  new agGrid.Grid(gridDivTop200, gridOptionsTop200);
});


function onBtnExport() {
  'use strict';
  var params = {
    columnSeparator: ';',
    fileName: 'Top 200.csv' // nom du fichier de sortie
  };
  gridOptionsTop200.api.exportDataAsCsv(params);
}


// =====================================================================================================================
let url = window.location.href;

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
      // ===========================================================
      gridOptionsTop200.api.setRowData(data.client_top200_);
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
  getData('2022-01-01', '2022-12-01');
});
