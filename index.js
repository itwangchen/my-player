const { app, BrowserWindow , ipcMain,  Menu, Tray} = require('electron')
// electron提供api
const path = require('path')
let mainWindow

function createWindow() {

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



let appIcon = null

ipcMain.on('put-in-tray', (event) => {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: () => {
      event.sender.send('tray-removed')
    }
  }])

  appIcon.setToolTip('Electron Demo in the tray.')
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', () => {
  appIcon.destroy()
})



app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (mainWindow === null) createWindow()
})
