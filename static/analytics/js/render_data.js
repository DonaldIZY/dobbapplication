// const cellClassRules = {
//   "negative-value": params => params.value < 0,
//   "positive-value": params => params.value > 0
// };
//
//
// let rowHeight = 20;
// let defaultCol = {
//     width: 90,
//     resizable: true
//   };
// let url = window.location.href;
//
//
// // ============================================== client entrant et sortant ============================================
// const columnDefs = [
//       {
//         headerName: '',
//         children: [
//           { headerName: 'NCC', field: 'ncc', width: 105, pinned: 'left'},
//           { headerName: 'Client', field: 'client', width: 105, pinned: 'left'},
//           { headerName: 'Segment', field: 'segment', width: 108, pinned: 'left'},
//           { headerName: 'Commercial', field: 'commercial', width: 200, pinned: 'left'},
//         ],
//       },
//
//       {
//         headerName: 'Performance CA YTD Octobre',
//         children: [
//           { headerName: 'Total', field: 'total', type: 'numericColumn', cellClassRules: cellClassRules },
//           { headerName: 'Fixe', field: 'fixe', type: 'numericColumn', cellClassRules: cellClassRules },
//           { headerName: 'Mobile', field: 'mobile', width: 100, type: 'numericColumn', cellClassRules: cellClassRules },
//           { headerName: 'Broadband', field: 'broadband', width: 120, type: 'numericColumn', cellClassRules: cellClassRules },
//           { headerName: 'ICT', field: 'ict', type: 'numericColumn', cellClassRules: cellClassRules },
//           { headerName: 'Rang', field: 'rang_t2', width: 110},
//           { headerName: 'Rang Prec', field: 'rang_t3', width: 110},
//         ],
//       },
//     ];
//
// const gridOptionsClientEntrant = {
//   columnDefs: columnDefs,
//   rowHeight: rowHeight,
//   defaultColDef: defaultCol,
//   getRowStyle: params => {
//     if (params.node.rowIndex % 2 === 0) {
//       return { background: '#eee' };
//     }
//   },
// };
//
// document.addEventListener('DOMContentLoaded', () => {
//     const gridDivClientEntrant = document.querySelector('#clientEntrant');
//     new agGrid.Grid(gridDivClientEntrant, gridOptionsClientEntrant);
// });
//
// const gridOptionsClientSortant = {
//   columnDefs: columnDefs,
//   rowHeight: rowHeight,
//   defaultColDef: defaultCol,
//   getRowStyle: params => {
//     if (params.node.rowIndex % 2 === 0) {
//       return { background: '#eee' };
//     }
//   },
// };
// document.addEventListener('DOMContentLoaded', () => {
//     const gridDivClientSortant = document.querySelector('#clientSortant');
//     new agGrid.Grid(gridDivClientSortant, gridOptionsClientSortant);
// });
//
// // ======================================== Requête pour obtenir les données ===========================================
//
// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-CSRFToken': getCookie('csrftoken')
//   },
//   body: JSON.stringify({
//     param1: 'volume',
//     param2: 'valeur',
//   })
// })
//   .then(function(response) {
//     'use strict';
//     if (response.ok) {
//       // Récupération des données reçues
//       return response.json();
//     } else {
//       // Gestion d'une erreur de requête
//       throw new Error('Error while fetching data');
//     }
//   })
//   .then(function(data) {
//     // Utilisation des données reçues
//     console.log(data);
//     // console.log(data.client_entrant)
//
//     gridOptionsClientEntrant.api.setRowData(data.client_entrant);
//     gridOptionsClientSortant.api.setRowData(data.client_sortant);
//   })
//   .catch(function(error) {
//     // Gestion d'une erreur de requête
//     console.error(error);
//   });
//
// // =========================  ==========================


var table = $('#client-entrant').DataTable({
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
  dom: 'Bfrtip',
  buttons: [
      {
          extend: 'excelHtml5',
          text: 'Export to Excel',
          customize: function( xlsx ) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];

              // Custom styling for specific cells
              $('row c[r^="C"]', sheet).attr( 's', '2' );
          }
      }
  ]
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
      table.rows.add(data.client_entrant2).draw(true);

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
