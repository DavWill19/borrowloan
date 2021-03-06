// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')


let window, tray

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 1270,
    height: 800,
    show: true,
    frame: true,
    fullscreenable: false,
    autoHideMenuBar: false,
    resizable: true,
    icon: 'public/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true, //this must be true
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    }
  })

  window.on('closed', () => window = null)

  // and load the index.html of the app.
  window.loadURL('http://localhost:3000/')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// const createTray = () => {
//     tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png')))

//     tray.on('click', () => {
//         if (window.isVisible()) {
//         window.hide()
//         } else {
//         window.show()
//         }
//     })
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  // createTray()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.