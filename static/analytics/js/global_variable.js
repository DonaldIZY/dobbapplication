var color_red = "#b43825";
var color_orange = "#f16e00";
var color_green = "#00b038";
var color_sombre = '#3b3b3b';
var color_blue = '#04668a';
var color_silver = '#919494';
var color_black = '#383838';

function getCookie(name) {
  "use strict";
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}


// ============================================= E-chart Options =======================================================
var grid = {left: '0%', right: '0%', bottom: '3%', containLabel: true};
