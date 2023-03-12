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




// =====================================================================================================================

document.getElementById('univers').addEventListener('change', function (qualifiedName, value) {
  // code à exécuter lorsque la valeur change
  // document.getElementById("header").innerHTML = this.value;

  let elements = document.getElementsByClassName('graph-title');
  for (let ele of elements) {
    ele.innerHTML = this.value;
  }

  getData(this.value);
});

document.getElementById('select-date').addEventListener('change', function (qualifiedName, value) {
  console.log(this);
});
