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

//=========================================================================================================================================
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

topPerformerByProductOption && topPerformerByProduct.setOption(topPerformerByProductOption);
topPerformerByUniversOption && topPerformerByUnivers.setOption(topPerformerByUniversOption);


var table_univers = $('#resume-univers').DataTable({
    searching: false, // Désactive la recherche
    lengthChange: false, // Désactive le nombre d'enregistrements affichés par page
    bFilter: false, // Désactive la recherche
    bLengthChange: false, // Désactive le nombre d'enregistrements affichés par page
    paging: false, // Désactive la pagination
    info: false, // Désactive le texte d'information
  });
var table_produit = $('#resume-produit').DataTable({
    searching: false,
    lengthChange: false,
    bFilter: false,
    bLengthChange: false,
    paging: false,
    info: false,
  });



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
      console.log(data);
      /* jshint ignore:end */
      // ===============================================================================================================
      if (typeof data.recap_univers !== 'undefined') {
        table_univers.rows().remove().draw();
        table_univers.rows.add(data.recap_univers).draw(true);
      }

      if (typeof data.recap_product !== 'undefined') {
        table_produit.rows().remove().draw();
        table_produit.rows.add(data.recap_product).draw(true);
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

