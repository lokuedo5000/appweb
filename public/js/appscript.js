// function searchGet(name) {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//     results = regex.exec(location.search);
//   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }
// var getresult = searchGet('v');


// MENU PEGADO
$(document).scroll(function() {
  var sv = $(this).scrollTop();
  if (sv > 300) {
    $('.menubg').addClass('menuappfixe');
  } else {
    $('.menubg').removeClass('menuappfixe');
  }
})




document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchform").addEventListener('submit', validarFormulario);
});

function validarFormulario(evento) {
  evento.preventDefault();
  var search = document.getElementById('autoComplete').value;
  if (search.length == 0) {

    return;
  }

  this.submit();
}
