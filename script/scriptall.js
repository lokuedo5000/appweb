// VER VIDEO
$('.playvideoset').click(function(event) {
  $('body').addClass('bodyhd');
  var idvideo = $(this).attr('data-video');
  videoplay(idvideo, 'videoyt');
  $('.thevideorep').fadeIn(200);
});

// CREATOR VIDEO
function videoplay(videoID, idInstall) {
  let createvideo = document.querySelector('#'+idInstall);
  var newifram = document.createElement("iframe");
  newifram.setAttribute("src", "https://www.youtube.com/embed/"+videoID);
  newifram.setAttribute("class", "responsive-iframe");
  newifram.setAttribute("allowtransparency", "true");
  newifram.setAttribute("scrolling", "no");
  newifram.setAttribute("frameborder", "0");
  newifram.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
  newifram.setAttribute("framespacing", "0");
  newifram.setAttribute("allowfullscreen", "");
  createvideo.appendChild(newifram);
}
// BANNER
function bannerset(text) {
  var gnrs = text.replace(/\s/g, '').split(",");
  var d = "";
  for (var get in gnrs) {
    d += `<div class="carousel-item red white-text setcap" href="#one!" style="background-image: url(${gnrs[get]});"></div>`;
  }
  return d;
}
// CREAR LISTA DE GENEROS EN VIEW
function listGeneros(text) {
  var gnrs = text.replace(/\s/g, '').split(",");
  var d = ""
  for (var get in gnrs) {
    d += `<a href="#">${gnrs[get]}</a>`;
  }
  return d;
}

// CREAR LINK
function enlaces(text, idArt) {
  var gnrs = text.replace(/\s/g, '').split(",");
  var d = ""
  for (var get in gnrs) {
    var num = parseInt(get) + parseInt(1);
    $('.text_prts').text(num);
    d += `<div class="listlinktb">
            <div class="textpart">
              <span>
                (#${num})
              </span>
            </div>
            <div class="textlink">
              ${gnrs[get].replace(/file\//g, '.../hsdr').replace(/folder\//g, '.../r85')}
            </div>
            <div class="btnir">
              <span class="dpib downlink box-s" data-index="${get}" data-id="${idArt}">
                Descargar
              </span>
            </div>
          </div>`;
  }
  return d;
}

// TEXT CORTO
function textShort(text, num) {
  if (text.length > num) {
    return text.slice(0, num) + '...';
  } else {
    return text;
  }
}

// VERIFICAR SI HAY 6 ARTICULOS DISPONUBLES
function verifiqNum(num) {
  if (num > 6) {
    return 6;
  } else {
    return num;
  }
}

function verifiqNumVIII(num) {
  if (num > 8) {
    return 8;
  } else {
    return num;
  }
}

function verifiqNumV(num) {
  if (num > 5) {
    return 5;
  } else {
    return num;
  }
}

function verifiqNumIV(num) {
  if (num > 4) {
    return 4;
  } else {
    return num;
  }
}

// VERIFICAR DATOS DEFAULT
function verifiqDf(text, res) {
  if (text.replace(/\s/g, '') == "-app") {
    return res;
  } else {
    return text;
  }
}

// REMPLAZAR ESPACIOS
function spaceRem(text) {
  return text.replace(/\s/g, '-');
}

// VERIFICAR FECHA
function verifiqDate(fecha) {
  if (fecha.replace(/\s/g, '').slice(0, 7).toLowerCase() == 'update-') {
    return fecha.slice(9, fecha.length);
  } else {
    return fecha;
  }
}

// VERIFICAR ESTADO
function verifiqEstado(state, version) {
  if (state.replace(/\s/g, '') == 'false') {
    return '<span class="trabajando">Trabajando</span>';
  } else {
    return '<span class="'+version.toLowerCase()+'">'+version.toLowerCase()+'</span>';
  }
}

// REMPLACE CRTRS
function rePlaceAllNor(text) {
  return text.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");
}

// PRIMERA LETRA MAYUSCULA
function mayuFirst(text) {
  var getnum = text.length;
  var firstletter = text.slice(0, 1)
  var mayutext = firstletter.toUpperCase();

  var deletefirst = text.slice(1, getnum)
  return mayutext + deletefirst;
}

// ABRIR ENLACES
$('.opa').click(function(event) {
  opa($(this).attr('data-link'))
});

// ENLACES
function opa(text) {
  var app_web = $('body').attr('data-web');
  if (app_web == "app") {
    $('.linkweb_open').attr('data-url', text);
    $('.linkweb_open').click();
  }else{
    window.open(text, '_blank')
  }
}
