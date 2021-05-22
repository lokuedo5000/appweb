// REQUIRE JS DEFAULT
const {
  ipcRenderer,
  shell
} = require('electron');
const path = require('path');
const fs = require('fs');
const appweb = require(path.join(__dirname, 'update'));

// DOM
window.addEventListener('DOMContentLoaded', () => {

  // SET ELECTRON
  document.querySelector("body").setAttribute('data-web', 'app');

  var appScript = document.querySelector("body").getAttribute('data-script');
  if (appScript == "loading") {
    var settime = setInterval(function() {
      clearInterval(settime);
      appweb.downloadVcode();
    }, 8000);


    document.querySelector(".downart").addEventListener("click", function(evento) {
      appweb.downloadArticle();
    })


  } else if (appScript == "appnor") {
    var verif = false;
    var getinfo = appweb.package();
    var vfile = appweb.vfiles();
    // Verificar Codes
    if (getinfo.version < vfile.vApp) {
      var titleUpdate = document.querySelector("title");
      titleUpdate.innerText += ' (' + 'new version available' + ')';

      let sethtml = document.querySelector('body');
      var updateBtn = document.createElement("div");
      updateBtn.setAttribute("onclick", `opa('${vfile.download.app}')`);
      updateBtn.setAttribute("class", 'btn-floating btn-large red pulse clickupdate clickweb opa');
      updateBtn.innerHTML = "<i class='cwI-cloud-download1'></i>";
      sethtml.appendChild(updateBtn);

      newapp();

      var verif = false;
    } else {
      var verif = true;
    }
    if (verif == true) {
      if (getinfo.vCode < vfile.vCode) {
        var titleUpdate = document.querySelector("title");
        titleUpdate.innerText += ' (' + 'an update available' + ')';

        let sethtml = document.querySelector('body');
        var updateBtn = document.createElement("a");
        updateBtn.setAttribute("href", '/update');
        updateBtn.setAttribute("class", 'btn-floating btn-large cyan pulse clickupdate');
        updateBtn.innerHTML = "<i class='cwI-cloud-download1'></i>";
        sethtml.appendChild(updateBtn);

        // SET NEW DATOS
        if (getinfo.download.vFilesZip == vfile.download.files) {} else {
          getinfo.download.vFilesZip = vfile.download.files;
          fs.writeFileSync(appweb.rutaPk(), JSON.stringify(getinfo, null, 2), 'utf-8');
        }
        // JSON ARTICLES
        if (getinfo.download.Articles == vfile.download.Articles) {} else {
          getinfo.download.Articles = vfile.download.Articles;
          fs.writeFileSync(appweb.rutaPk(), JSON.stringify(getinfo, null, 2), 'utf-8');
        }
      }
    }

    // AUTO UPDATE ARTICLES
    var settime = setInterval(function() {
      appweb.jsonUpdate();
    }, 1 * 1000 * 60 * 4);
    // appweb.jsonUpdate();
  } else if (appScript == "update") {
    var vfile = appweb.vfiles();
    var upda = setInterval(function() {
      clearInterval(upda);
      var setTitle = document.querySelector(".title");
      setTitle.innerText = "Descargando...";

      appweb.updateZip(vfile.vCode);


    }, 5000);
  }


  window.addEventListener('load', listo, false);

  function listo() {

  }


  function newapp() {
    const opennew = document.querySelector(".clickweb");
    opennew.addEventListener("click", function(evento) {
      var closeapp = setInterval(function() {
        clearInterval(closeapp);
        ipcRenderer.send('-app', 'close');
      }, 2000);
    })
  }

  // OPEN LINKS
  let urls = document.querySelectorAll('.linkweb_open');
  urls.forEach(link => {
    link.addEventListener('click', () => {
      var linkWeb = link.getAttribute("data-url");
      if (linkWeb == 'no') {
        return false;
      } else {
        event.preventDefault();
        shell.openExternal(linkWeb);
      }
    })
  })
})
