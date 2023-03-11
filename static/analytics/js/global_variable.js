//Récupération de la police du HTML
var fontFamily = window.getComputedStyle(document.body).getPropertyValue('font-family');

//Variations de rouge (Baisse)
var color_red = "#AD1919";
var color_red_1 = "#D44235";
var color_red_2 = "#FC6552";
//Variations de bleu (Hausse)
var color_blue = "#004E68";
var color_blue_1 = "#4898B5";
var color_blue_2 = "#73C0DE";

var color_orange = "#f16e00";
var color_green = "#006B5E";
var color_sombre = '#3b3b3b';
// var color_blue = '#04668a';
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
var grid = {top:'2%', left: '2%', right: '2%', bottom: '2%', containLabel: false};
