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
var color_silver = '#919494';
var color_black = '#383838';

//Liste de couleurs
let listOfColor = [color_blue, color_orange, color_silver, color_red];

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

let etiquette_format = function (params) {
  var value = params.value;
  if (value >= 1000000000) {
      return (value/1000000000).toFixed(2) + ' Md'; // afficher en milliards
  } else if (value < 1000000000 && value >= 1000000) {
      return (value/1000000).toFixed(2) + ' M'; // afficher en millions
  } else if (value < 1000000 && value >= 100000){
      return (value/1000).toFixed(2) + ' K'; // afficher en milliers
  } else {
      return value; // afficher les valeurs directement
  }
};

// ============================================= E-chart Options =======================================================
var grid = {top:'10%', left: '1%', right: '1%', bottom: '5%', containLabel: true};
