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
  var caPerSegment = echarts.init(document.getElementById('caPerSegment'), null, {renderer: 'canvas', force: true} );
  var caPerSegmentOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Corporate', 'SME', 'Secteur public', 'TPE']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan-23', 'Fev-23', 'Mar-23', 'Avr-23', 'Mai-23', 'Juin-23', 'Juil-23']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Corporate',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [32120, 34132, 10100, 13400, 9000, 23230, 21000],
        smooth: true
      },
      {
        name: 'SME',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [67220, 18200, 19100, 23400, 29000, 33000, 31000],
        smooth: true
      },
      {
        name: 'Secteur public',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [15000, 52232, 18201, 23154, 56190, 20330, 21410],
        smooth: true
      },
      {
        name: 'TPE',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [32000, 33200, 30100, 33400, 39000, 33000, 32000],
        smooth: true
      },
    ]
  };
  caPerSegment.setOption(caPerSegmentOption);

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
