const {app, BrowserWindow} = require('electron')
// electron提供api
const path = require('path')
let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html' )
  mainWindow.loadURL('https://mis.yyhealth.com')

  mainWindow.on('closed', function () {

    mainWindow = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (mainWindow === null) createWindow()
})
