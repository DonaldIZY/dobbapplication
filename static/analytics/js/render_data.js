const cellClassRules = {
  "negative-value": params => params.value < 0,
  "positive-value": params => params.value > 0
};


let rowHeight = 20;
let defaultCol = {
    width: 90,
    resizable: true
  };
let url = window.location.href;


// ============================================== client entrant et sortant ============================================
const columnDefs = [
      {
        headerName: '',
        children: [
          { headerName: 'NCC', field: 'ncc', width: 100, pinned: 'left'},
          { headerName: 'Client', field: 'client', width: 105, pinned: 'left'},
          { headerName: 'Segment', field: 'segment', width: 108, pinned: 'left'},
          { headerName: 'Commercial', field: 'commercial', width: 200, pinned: 'left'},
        ],
      },

      {
        headerName: 'Performance CA YTD Octobre',
        children: [
          { headerName: 'Total', field: 'total', type: 'numericColumn', cellClassRules: cellClassRules },
          { headerName: 'Fixe', field: 'fixe', type: 'numericColumn', cellClassRules: cellClassRules },
          { headerName: 'Mobile', field: 'mobile', width: 100, type: 'numericColumn', cellClassRules: cellClassRules },
          { headerName: 'Broadband', field: 'broadband', width: 120, type: 'numericColumn', cellClassRules: cellClassRules },
          { headerName: 'ICT', field: 'ict', type: 'numericColumn', cellClassRules: cellClassRules },
          { headerName: 'Rang T2', field: 'rang_t2', width: 110},
          { headerName: 'Rang T3', field: 'rang_t3', width: 110},
        ],
      },
    ];

const gridOptionsClientEntrant = {
  columnDefs: columnDefs,
  rowHeight: rowHeight,
  defaultColDef: defaultCol,
  getRowStyle: params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDivClientEntrant = document.querySelector('#clientEntrant');
    new agGrid.Grid(gridDivClientEntrant, gridOptionsClientEntrant);
});

const gridOptionsClientSortant = {
  columnDefs: columnDefs,
  rowHeight: rowHeight,
  defaultColDef: defaultCol,
  getRowStyle: params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
};
document.addEventListener('DOMContentLoaded', () => {
    const gridDivClientSortant = document.querySelector('#clientSortant')
    new agGrid.Grid(gridDivClientSortant, gridOptionsClientSortant)
});

// ======================================== Requête pour obtenir les données ===========================================

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  },
  body: JSON.stringify({
    param1: 'volume',
    param2: 'valeur',
  })
})
  .then(function(response) {
    if (response.ok) {
      // Récupération des données reçues
      return response.json();
    } else {
      // Gestion d'une erreur de requête
      throw new Error('Error while fetching data');
    }
  })
  .then(function(data) {
    // Utilisation des données reçues
    console.log(data);
    console.log(data.client_entrant)

    gridOptionsClientEntrant.api.setRowData(data.client_entrant);
    gridOptionsClientSortant.api.setRowData(data.client_sortant);
  })
  .catch(function(error) {
    // Gestion d'une erreur de requête
    console.error(error);
  });

// =========================  ==========================

// =================== Projection Client entrant ou sortant =========================
const columnProjection = [
    { field: 'Top', width: 80, },
    { field: 'Client', width: 110, },
    { field: 'Segment', width: 110,  },
    { field: 'Commercial', width: 150, },
    { field: 'Gap', width: 100, }
];

const rowProjection = [
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
  {
    Top: 208, Client: "Client5704", Segment: "TPE", Commercial: "Thierry Dadié", Gap: 3421254
  },
];

const gridOptionsProjection = {
  columnDefs: columnProjection,
  rowData: rowProjection,
  rowHeight: rowHeight,
  defaultColDef: {
    width: 90,
    resizable: true
  },
  getRowStyle: params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#projectionEntrant');
    new agGrid.Grid(gridDiv, gridOptionsProjection);
});

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#projectionSortant');
    new agGrid.Grid(gridDiv, gridOptionsProjection);
});
// =================== Fin Projection Client entrant et sortant =================

const columnPerformanceCA = [
  {
    headerName: '',
    marryChildren: true,
    children: [
      { field: 'Date', width: 100, pinned: 'left' },
    ],
  },
  {
    headerName: 'Fixe',
    marryChildren: true,
    children: [
      { field: 'Voix Fixe', width: 110, cellClassRules: cellClassRules },
      { field: 'Data Fixe', width: 115, cellClassRules: cellClassRules },
      { headerName: 'Total', field: 'Total Fixe', width: 108, cellClassRules: cellClassRules},
    ],
  },
  {
    headerName: 'Mobile',
    marryChildren: true,
    children: [
      { headerName: 'Total', field: 'Total Mobile', width: 140, cellClassRules: cellClassRules },
    ],
  },
  {
    headerName: 'Broadband',
    marryChildren: true,
    children: [
      { field: 'ADSL', width: 100, cellClassRules: cellClassRules},
      { field: 'FTTx', width: 105, cellClassRules: cellClassRules, },
      { field: 'LTE', width: 108, cellClassRules: cellClassRules, },
      { field: 'LSI', width: 108, cellClassRules: cellClassRules, },
      { headerName: 'Total', field: 'Total Broadband', width: 108, cellClassRules: cellClassRules },
    ],
  },
  {
    headerName: 'ICT',
    marryChildren: true,
    children: [
      { headerName: 'Total', field: 'Total ICT', width: 108, cellClassRules: cellClassRules },
    ],
  },
  {
    headerName: 'Croissance',
    marryChildren: true,
    children: [
      { field: 'Positive', width: 108, pinned: 'right' },
      { field: 'Negative', width: 108, pinned: 'right' },
    ],
  },
  {
    headerName: '',
    marryChildren: true,
    children: [
      { field: 'Top 200', width: 108, cellClassRules: cellClassRules, pinned: 'right' },
    ],
  },
];

const rowPerformanceCA = [
  {
    Date: "Janv-22", 'Voix Fixe': -15, 'Data Fixe': 9, 'Total Fixe': 1.6, 'Total Mobile': 0.6,
    'ADSL': 12, 'FTTx': 23.4, 'LTE': -26.3, 'LSI': 7.7, 'Total Broadband': 4.8, 'Total ICT': 39.6,
    Positive: 95, 'Negative': 104, 'Top 200': 3.3,
  },
  {
    'Date': "Fevr-22", 'Voix Fixe': -12.7, 'Data Fixe': 11.3, 'Total Fixe': 4.1, 'Total Mobile': 1.4,
    'ADSL': 3.8, 'FTTx': 19.4, 'LTE': -21.4, 'LSI': 9.9, 'Total Broadband': 6.9, 'Total ICT': 349.5,
    'Positive': 99, 'Negative': 101, 'Top 200': 12.6
  },
  {
    Date: "Mars-22", 'Voix Fixe': -12.1, 'Data Fixe': 9.8, 'Total Fixe': 3.2, 'Total Mobile': 3.7,
    'ADSL': 1.8, 'FTTx': 20.4, 'LTE': -23.8, 'LSI': 9.7, 'Total Broadband': 6.6, 'Total ICT': 459.7,
    Positive: 99, 'Negative': 101, 'Top 200': 11.7
  },
  {
    Date: "Avr-22", 'Voix Fixe': -12.6, 'Data Fixe': 8.7, 'Total Fixe': 2.3, 'Total Mobile': 4.1,
    'ADSL': -1.3, 'FTTx': 12.2, 'LTE': -21.4, 'LSI': 7, 'Total Broadband': 4.3, 'Total ICT': 452.8,
    Positive: 96, 'Negative': 104, 'Top 200': 8.9
  },
  {
    Date: "Mai-22", 'Voix Fixe': -12.9, 'Data Fixe': 8.8, 'Total Fixe': 2.3, 'Total Mobile': 4.1,
    'ADSL': -3, 'FTTx': 11.5, 'LTE': -20, 'LSI': 9.4, 'Total Broadband': 6.3, 'Total ICT': 330,
    Positive: 93, 'Negative': 107, 'Top 200': 10.2
  },
  {
    Date: "Juin-22", 'Voix Fixe': -13.7, 'Data Fixe': 9.1, 'Total Fixe': 2.2, 'Total Mobile': 4.1,
    'ADSL': -3.6, 'FTTx': 11.8, 'LTE': -17.4, 'LSI': 8.9, 'Total Broadband': 6.2, 'Total ICT': 123.5,
    Positive: 95, 'Negative': 106, 'Top 200': 7.6
  },
  {
    Date: "Juil-22", 'Voix Fixe': -13.1, 'Data Fixe': 8.7, 'Total Fixe': 2.1, 'Total Mobile': 4.9,
    'ADSL': -3.3, 'FTTx': 12.8, 'LTE': -4, 'LSI': 8.5, 'Total Broadband': 7.4, 'Total ICT': 189.2,
    Positive: 98, 'Negative': 102, 'Top 200': 9.2
  },
  {
    Date: "Aout-22", 'Voix Fixe': -12.7, 'Data Fixe': 8.6, 'Total Fixe': 2.1, 'Total Mobile': 4.3,
    'ADSL': -2.2, 'FTTx': 12.2, 'LTE': -1.7, 'LSI': 9.6, 'Total Broadband': 8.5, 'Total ICT': 3.4,
    Positive: 103, 'Negative': 97, 'Top 200': 3.8
  },
  {
    Date: "Sept-22", 'Voix Fixe': -13.1, 'Data Fixe': 8.2, 'Total Fixe': 1.8, 'Total Mobile': 5.1,
    'ADSL': -0.2, 'FTTx': 13.5, 'LTE': 1.6, 'LSI': 9.4, 'Total Broadband': 8.7, 'Total ICT': -0.5,
    Positive: 103, 'Negative': 97, 'Top 200': 3.8
  },
  {
    Date: "Oct-22", 'Voix Fixe': -13.1, 'Data Fixe': 8.2, 'Total Fixe': 1.8, 'Total Mobile': 5.1,
    'ADSL': -0.2, 'FTTx': 13.5, 'LTE': 1.6, 'LSI': 9.4, 'Total Broadband': 8.7, 'Total ICT': -3.5,
    Positive: 98, 'Negative': 102, 'Top 200': 3.1
  },
  {
    Date: "Nov-22", 'Voix Fixe': -13.3, 'Data Fixe': 7.2, 'Total Fixe': 1.2, 'Total Mobile': 4.8,
    'ADSL': -3.2, 'FTTx': 14.1, 'LTE': -0.9, 'LSI': 9.1, 'Total Broadband': 8.4, 'Total ICT': -3.5,
    Positive: 98, 'Negative': 102, 'Top 200': 3.1
  },

];


const gridOptionsPerformanceCA = {
  columnDefs: columnPerformanceCA,
  rowData: rowPerformanceCA,
  columnGroupShow: true,
  getRowStyle: params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: '#eee' };
    }
  },
  rowHeight: rowHeight,
  defaultColDef: {
    width: 90,
    resizable: true
  },
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#table-performance-ca');
    new agGrid.Grid(gridDiv, gridOptionsPerformanceCA);
});


const columnPerformanceCAPivot = [
  { field: 'Produit', width: 110, cellClassRules: cellClassRules },
  { field: 'Detail', width: 110, cellClassRules: cellClassRules },
  { field: 'Janv-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Fevr-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Mars-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Avr-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Mai-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Juin-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Juil-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Aout-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Sept-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Oct-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Nov-22', width: 110, cellClassRules: cellClassRules },
  { field: 'Dec-22', width: 110, cellClassRules: cellClassRules },

];


