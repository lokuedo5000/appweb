// REQUIRE JS EXPRESS
const express = require('express')
const web = express()
// REQUIRE JS EJS
const ejs = require('ejs');
// REQUIRE JS ELECTRON
const {
  app,
  BrowserWindow,
  webContents,
  Menu,
  ipcMain,
  nativeTheme,
  Notification,
  nativeImage,
  ipcRenderer,
  screen,
  dialog
} = require('electron');
// REQUIRE JS DEFAULT
const url = require('url');
const path = require('path');
const fs = require('fs');
const https = require('https');
const download = require('download-git-repo');
// REQUIRE JS GENERADOR ID
const {
  v4: uuidv4
} = require('uuid');
// REQUIRE JS SAVE INFO WINDOWS
const WindowStateManager = require('electron-window-state-manager');
// RUTAS DE ARCHIVOS & FOLDERS
const rutasDB = path.join(__dirname, '../', 'db', 'AppDatas', 'db.json');
// VARIABLES
let win
let runweb
// SCRIPT APP

function getPackage() {
  var file_arts = fs.readFileSync(path.join(__dirname, '../', 'package.json'), 'utf-8');
  return JSON.parse(file_arts);
}

// CREAR CARPETAS QUE NO EXISTEN
function craeteData(datafile) {
  try {
    fs.mkdirSync(datafile);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

craeteData(path.join(__dirname, '../', 'data'));
craeteData(path.join(__dirname, '../', 'data', 'tempfiles'));

download('direct:https://github.com/lokuedo5000/appweb.git', path.join(__dirname, '../', 'data', 'tempfiles'), { clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
})

// SERVER
// SETTING SERVER
web.set("view engine", "ejs");
web.set('port', getPackage().config.port)
web.use(express.urlencoded({
  extended: false
}));

// CARGAR ARCHIVOS JSON
function loadArticles() {
  const file_arts = fs.readFileSync(path.join(__dirname, '../', 'data', 'articles.json'), 'utf-8');
  return JSON.parse(file_arts);
}
// CARGAR SCRIPT
function loadScriptAll() {
  return fs.readFileSync(path.join(__dirname, '../', 'script', 'scriptall.js'), 'utf-8');
}
// SCRIPT EXTRA
function textShort(text, num) {
  if (text.length > num) {
    return text.slice(0, num) + '...';
  } else {
    return text;
  }
}
// CAROUSEL
function crearCarousel() {
  const cargarArt = fs.readFileSync(path.join(__dirname, '../', 'data', 'articles.json'), 'utf-8');
  var file_arts = JSON.parse(cargarArt);
  var getart = file_arts.articles;
  // VERIFICAR LA CANTIDAD DE ARTICULOS
  if (file_arts.articles.length > 4) {
    var numero = 4;
  } else {
    var numero = file_arts.articles.length;
  }
  fs.writeFileSync(path.join(__dirname, '../', 'views', 'partial', 'carousel.ejs'), '', 'utf-8');
  for (var g = 0; g < numero; g++) {
    var leercarousel = fs.readFileSync(path.join(__dirname, '../', 'views', 'partial', 'carousel.ejs'), 'utf-8');

    var newCrsl = `<div class="carousel-item red white-text" href="#one!" style="background-image: url(${getart[g].banner});">
                  <div class="datarec">
                    <div class="defcover cover_img" style="background-image: url(${getart[g].img});">

                    </div>
                    <div class="defcover cover_text">
                      <div class="scroll_cover">
                        <div class="sprt-text cover_titulo">
                          ${getart[g].name}
                        </div>
                        <div class="sprt-text versionart">
                          <span class="vers">Version:</span> <span class="textvers">${getart[g].version}</span>
                        </div>
                        <div class="sprt-text versionart">
                          <span class="vers">Desarrolladora:</span> <span class="textvers">${getart[g].desarrolladora}</span>
                        </div>
                        <div class="sprt-text dcpmini">
                          ${textShort(getart[g].dcp, 180)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;

    fs.writeFileSync(path.join(__dirname, '../', 'views', 'partial', 'carousel.ejs'), leercarousel+'\n'+newCrsl, 'utf-8');

  }
}
// RUTAS
// HOME
web.get('/', (req, res) => {
  // CREAR CAROUSEL
  crearCarousel();
  // END
  res.render(path.join(__dirname, '../', 'views', 'index'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// GAMES
web.get('/games', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'games'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// PROGRAMS
web.get('/programs', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'programs'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// FILTRO
web.get('/filtro', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'filtro'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// SEARCH
web.get('/search', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'search'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// DOWNLOAD
web.get('/download', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'download'), {
    artall: loadArticles(),
    script: loadScriptAll()
  });
})

// UPDATE
web.get('/update', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'update'), {
    infoapp: getPackage()
  });
})

// DOWNLOAD LINK
web.post('/links', (req, res) => {
  const {
    id,
    index
  } = req.body;

  // VERIFICAR ENLACE
  var the_link = loadArticles().articles;
  // GET ARTICLE
  var open_web = the_link.filter(all => all.urls == id);

  if (getPackage().config.open == true) {
    res.send('http://adf.ly/9857561/' + getlink(index, open_web[0].enlaces));
  }else{
    res.send(getlink(index, open_web[0].enlaces));
  }

  function getlink(num, text) {
    var d = "";
    var gnrs = text.replace(/\s/g, '').split(",");
    for (var get in gnrs) {
      if (num == get) {
        d = gnrs[get];
      }
    }
    return d;
  }
})

// LOADING
web.get('/loading', (req, res) => {
  res.render(path.join(__dirname, '../', 'views', 'loading'));
})

// RUN SERVER
// PUBLIC
web.use(express.static(path.join(__dirname, '../public')))

// MIDDLEWARES
web.use(function(req, res) {
  res.status(404).send('Sorry cant find that!' + '<a href="/">home</a>');
})

// LISTENIG ON SERVER
web.listen(web.get('port'), () => {

})



// READY
app.on('ready', () => {
  //DEFAULT TAMAÑO VENTANA MAINWINDOW
  const winState = new WindowStateManager('win', {
    defaultWidth: 606,
    defaultHeight: 500
  });
  win = new BrowserWindow({
    icon: path.join(__dirname, '../assets/icons/win/ico#2.ico'),
    width: winState.width,
    height: winState.height,
    'minWidth': 506,
    'minHeight': 400,
    x: winState.x,
    y: winState.y,
    title: 'AppWeb',
    // titleBarStyle: 'customButtonsOnHover',
    // transparent: true,
    // maximizable: false,
    // resizable: false,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preApp.js')
    }
  });

  //AGREGAR MENU A MAINWINDOW
  const menuMainWindow = Menu.buildFromTemplate(templateMenu);
  win.setMenu(menuMainWindow);
  win.setMenuBarVisibility(false);

  // SI LA APLICACION SE CERRO EN MAXIMIZE
  if (winState.maximized) {
    win.maximize();
  }

  // CARGAR URL
  const rutaServer = getPackage();
  win.loadURL('http://' + rutaServer.config.host + ':' + rutaServer.config.port + '/loading');
  win.on('close', () => {
    winState.saveState(win);
  })

})

// -APP
// cog app
ipcMain.on('-app', (e, data) => {
  if (data == "close") {
    app.quit();
  }
})

//QUITAR MENU
Menu.setApplicationMenu(null);

// Menu Template
var templateMenu = [{
  label: 'File',
  submenu: [{
      label: 'Save Json',
      accelerator: process.platform == 'darwin' ? 'command+S' : 'Ctrl+S',
      click() {
        // savefiles()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Ayuda',
      click() {

      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
      click() {
        app.quit();
      }
    }
  ]
}];

// Reload in Development for Browser Windows
var DevTools = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : true;

if (DevTools) {
  templateMenu.push({
    label: 'DevTools',
    submenu: [{
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
};
