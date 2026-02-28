const { app, BrowserWindow, ipcMain, screen } = require('electron');
// const publicIp = require('public-ip')

const steamworks = require('steamworks.js');
const { matchmaking } = require('steamworks.js/client');

const PLAYTEST_ID = -1
const LIVE_ID=-1

let sw = steamworks.init(LIVE_ID) 
try{
  sw = steamworks.init(LIVE_ID) 
} 
catch(e){
  console.log('steam unavailable...')
}

// const publicIp = require('public-ip')

ipcMain.on('close', ()=>{
  console.log('quit invoked')
  app.quit()
})
ipcMain.on('quit', ()=>{
  console.log('quit invoked')
  app.quit()
})

if(sw){
  console.log('registering steamworks hooks...')
  ipcMain.on('achievement', (e, achievement)=>{
    console.log('achievment unlocked: '+achievement)
    sw.achievement.activate(achievement)
  })
  
  ipcMain.handle('save', (e, playerJSON)=>{
    console.log('save was invoked')
    console.log(sw.cloud.writeFile('spsave', playerJSON))
  })
  
  ipcMain.handle('load', (e)=>{
    return sw.cloud.readFile('spsave')
  })
}
// ipcMain.on('setSessionName', (event, player)=>{
//   let s = new Server()
//   s.init(player)
// })

// ipcMain.on('getExternalIp', async (event)=>{
//   let ip = await publicIp.v4()
//   console.log('found ip '+ip)
//   event.reply('ipDiscovery', ip)
// })


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    maximizable: true,
    disableAutoHideCursor: true,
    fullscreen: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
