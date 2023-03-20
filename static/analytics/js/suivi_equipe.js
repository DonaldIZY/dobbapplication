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
    data: ['Commercial 1', 'Commercial 2', 'Commercial 3', 'Commercial 4', 'Commercial 5', 'Commercial 6', 'Commercial 7'],
    scale: true,
    show: true,
    },
  series: [
    {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25],
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
    data: ['Commercial 1', 'Commercial 2', 'Commercial 3', 'Commercial 4', 'Commercial 5', 'Commercial 6', 'Commercial 7'],
    scale: true,
    show: true,
    },
  series: [
    {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25],
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
    var fontSizeTopProduit = document.getElementById('dashboardTopProduits').offsetWidth / 50;
    topPerformerByProduct.setOption({
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

    topPerformerByUnivers.resize();
    var fontSizeTopProduit = document.getElementById('dashboardTopProduits').offsetWidth / 50;
    topPerformerByUnivers.setOption({
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
});

topPerformerByProductOption && topPerformerByProduct.setOption(topPerformerByProductOption);
topPerformerByUniversOption && topPerformerByUnivers.setOption(topPerformerByUniversOption);


var table = $('.my_table').DataTable({
    searching: false, // Désactive la recherche
    lengthChange: false, // Désactive le nombre d'enregistrements affichés par page
    bFilter: false, // Désactive la recherche
    bLengthChange: false, // Désactive le nombre d'enregistrements affichés par page
    paging: false, // Désactive la pagination
    info: false, // Désactive le texte d'information
  });