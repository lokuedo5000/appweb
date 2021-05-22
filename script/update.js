// REQUIRE JS DEFAULT
const url = require('url');
const path = require('path');
const fs = require('fs');
const https = require('https');

function getPackage() {
  var file_arts = fs.readFileSync(path.join(__dirname, '../', 'package.json'), 'utf-8');
  return JSON.parse(file_arts);
}

function getvFiles() {
  var file_arts = fs.readFileSync(path.join(__dirname, '../', 'data', 'vfiles.json'), 'utf-8');
  return JSON.parse(file_arts);
}

function artLocal(text) {
  if (text == "text") {
    return fs.readFileSync(path.join(__dirname, '../', 'data', 'articles.json'), 'utf-8');
  } else {
    var file_arts = fs.readFileSync(path.join(__dirname, '../', 'data', 'articles.json'), 'utf-8');
    return JSON.parse(file_arts);
  }
}

function artDownload(text) {
  if (text == "text") {
    return fs.readFileSync(path.join(__dirname, '../', 'data', 'tempfiles', 'articles.json'), 'utf-8');
  } else {
    var file_arts = fs.readFileSync(path.join(__dirname, '../', 'data', 'tempfiles', 'articles.json'), 'utf-8');
    return JSON.parse(file_arts);
  }
}

module.exports = {
  jsonUpdate: function() {
    var file = fs.createWriteStream(path.join(__dirname, '../', 'data', 'tempfiles', 'articles.json'));
    var len = 0;
    https.get(getPackage().download.Articles, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        //var percent = (len / res.headers['content-length']) * 100;
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        if (artLocal('json').articles.length == artDownload('json').articles.length) {
          if (artLocal('text') == artDownload('text')) {

          }else{
            var setTitle = document.querySelector("title");
            setTitle.innerText += " - (Articulos Actualizados)";

            // SAVE NEW DATA
            fs.writeFileSync(path.join(__dirname, '../', 'data', 'articles.json'), artDownload('text'), 'utf-8');
          }
        }else{
          var setTitle = document.querySelector("title");
          setTitle.innerText += " - (Hay Articulos Nuevos)";

          // SAVE NEW DATA
          fs.writeFileSync(path.join(__dirname, '../', 'data', 'articles.json'), artDownload('text'), 'utf-8');
        }
      });
    }).on('error', function() {});
  },
  jsonCompare: function() {

  },
  UpdateBtn: function() {

  },
  downloadVcode: function() {
    var file = fs.createWriteStream(path.join(__dirname, '../', 'data', 'vfiles.json'));
    var len = 0;
    https.get(getPackage().download.vCode, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        var percent = (len / res.headers['content-length']) * 100;
        document.querySelector(".set_progrees").setAttribute('style', 'width: ' + percent + '%;');
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        setTimeout(function() {
          // window.location.href='/';
          document.querySelector(".set_progrees").setAttribute('style', 'width: 0%;');
          document.querySelector(".downart").click();
        }, 2000);
      });
    }).on('error', function() {
      var setTitle = document.querySelector(".title");
      setTitle.innerText = "Error. Internet";
      document.querySelector(".reintentar").setAttribute('class', 'reintentar');
    });
  },
  downloadArticle: function() {
    var file = fs.createWriteStream(path.join(__dirname, '../', 'data', 'articles.json'));
    var len = 0;
    https.get(getPackage().download.Articles, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        var percent = (len / res.headers['content-length']) * 100;
        document.querySelector(".set_progrees").setAttribute('style', 'width: ' + percent + '%;');
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        setTimeout(function() {
          window.location.href = '/';
        }, 3000);
      });
    }).on('error', function() {
      var setTitle = document.querySelector(".title");
      setTitle.innerText = "Error. Internet";

      document.querySelector(".reintentar").setAttribute('class', 'reintentar');
    });
  },
  updateZip: function(version) {
    function finishInstall() {
      // process.cwd()
      // EXTRAER ARCHIVOS
      var file_descargada = path.join(__dirname, '../', 'data', 'tempfiles', 'update.zip');
      var folder_installl = path.join(__dirname, '../');
      var extract = require('extract-zip');
      var update_file = path.resolve(file_descargada);
      var install_update = path.resolve(folder_installl);

      extract(update_file, {
        dir: install_update
      }, function(err) {
        if (err) {
          console.log(err);
        } else {
          var setTitle = document.querySelector(".title");
          setTitle.innerText = "Full (Update v" + version + ")";
          document.querySelector(".set_progrees").setAttribute('style', 'width: ' + '100' + '%;');
          var getnewdata = getvFiles();
          var newdata = getPackage();
          newdata.vCode = getnewdata.vCode;
          fs.writeFileSync(path.join(__dirname, '../', 'package.json'), JSON.stringify(newdata, null, 2), 'utf-8');
          setTimeout(function() {
            window.location.href = '/';
          }, 3000);
        }
      })

    }
    var file = fs.createWriteStream(path.join(__dirname, '../', 'data', 'tempfiles', 'update.zip'));
    var len = 0;
    https.get(getPackage().download.vFilesZip, function(res) {
      res.on('data', function(chunk) {
        file.write(chunk);
        len += chunk.length;
        var percent = (len / res.headers['content-length']) * 100;
        document.querySelector(".set_progrees").setAttribute('style', 'width: ' + percent + '%;');
      });
      res.on('end', function() {
        file.close();
      });
      file.on('close', function() {
        setTimeout(function() {
          var setTitle = document.querySelector(".title");
          setTitle.innerText = "Preparando...";
          finishInstall();
          document.querySelector(".set_progrees").setAttribute('style', 'width: ' + '45' + '%;');
        }, 2000);
      });
    }).on('error', function() {
      var setTitle = document.querySelector(".title");
      setTitle.innerText = "Error al Descargar";

      document.querySelector(".reintentar").setAttribute('class', 'reintentar');
    });
  },
  package: function() {
    return getPackage();
  },
  vfiles: function() {
    return getvFiles();
  },
  rutaPk: function() {
    return path.join(__dirname, '../', 'package.json');
  }
}
