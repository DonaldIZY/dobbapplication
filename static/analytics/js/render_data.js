const cellClassRules = {
  "negative-value": params => params.value < 0,
  "positive-value": params => params.value > 0
};

let defaultCol = {
    width: 90,
    resizable: true
  };

const colTop200 = [
  {field: 'client', pinned: 'left', minWidth: 120 },
  { field: 'segment', cellClass: 'custom-ag-color', minWidth: 150 },
  { field: 'commercial', minWidth: 200 },
  { field: 'mobile', minWidth: 80 },
  { field: 'fixe', minWidth: 80 },
  { headerName: 'ICT', field: 'ict', minWidth: 80 },
  { field: 'broadband', minWidth: 110 },
  { field: 'rang', minWidth: 60 },
  { headerName: 'Rang Préc', field: 'rang_prec', minWidth: 100 },
];

const gridOptionsTop200 = {
  columnDefs: colTop200,
  rowClass: 'custom',
  rowClassRules: {
    "row-vert-ciel": function(params) { return params.data.rang_prec > 200; },
  },
  rowHeight: 38,
  sortable: true,
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


var table_200 = $('#client-200').DataTable({
  language: {
    "search": "Chercher",
    "decimal": ',',
          "thousands": ' ',
    "emptyTable": "Aucune donnée disponible dans le tableau",
    "loadingRecords": "Chargement en cours...",
    "processing": "Traitement en cours...",
    "lengthMenu": "Afficher _MENU_ entrées",
    "zeroRecords": "Aucun enregistrement correspondant trouvé",
    "info": "Page _PAGE_ sur _PAGES_",
    "infoEmpty": "Aucun enregistrement",
    "infoFiltered": "(Nombre de résultats trouvés: _TOTAL_ / _MAX_ enregistrements)",
    paginate: {
      next: '<i class="fa-solid fa-angle-right"></i>',
      previous: '<i class="fa-solid fa-angle-left"></i>'
    }
    },
});


var table_sortant = $('#client-sortant').DataTable({
  language: {
    "search": "Chercher",
    "decimal": ',',
          "thousands": ' ',
    "emptyTable": "Aucune donnée disponible dans le tableau",
    "loadingRecords": "Chargement en cours...",
    "processing": "Traitement en cours...",
    "lengthMenu": "Afficher _MENU_ entrées",
    "zeroRecords": "Aucun enregistrement correspondant trouvé",
    "info": "Page _PAGE_ sur _PAGES_",
    "infoEmpty": "Aucun enregistrement",
    "infoFiltered": "(Nombre de résultats trouvés: _TOTAL_ / _MAX_ enregistrements)",
    paginate: {
      next: '<i class="fa-solid fa-angle-right"></i>',
      previous: '<i class="fa-solid fa-angle-left"></i>'
    }
    },
});

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
      // let data_200 = data.client_top200
      
      // Supprimer les informations du tableau existant
      table_200.clear();
      table_200.rows.add(data.client_top200).draw(true);

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
