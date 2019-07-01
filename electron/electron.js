const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

/*========== TRAY ==========*/
let tray;
function createTray() {
  tray = new Tray(`${path.join(__dirname, 'trayicon.png')}`);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', type: 'normal', role: 'quit' }
  ]);
  tray.setToolTip('Burn some fat!');
  tray.setContextMenu(contextMenu);
}

/*========== MAIN WINDOW ==========*/
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    show: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', () => {
  createTray();
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
app.dock.hide();

/*========== MESSAGE WINDOW ==========*/
let messageWindow;
function createMessage() {
  messageWindow = new BrowserWindow({
    width: 400,
    height: 400,
    alwaysOnTop: true,
    frame: false,
    backgroundColor: '#ffd038',
    webPreferences: {
      nodeIntegration: true
    }
  });
  messageWindow.loadURL(
    isDev
      ? 'http://localhost:3000?message'
      : `file://${path.join(__dirname, '../build/index.html?message')}`
  );
  messageWindow.on('closed', () => (messageWindow = null));
  messageWindow.hide();
  messageWindow.once('ready-to-show', function() {
    messageWindow.show();
  });
}

ipcMain.on('show-message', () => createMessage());
ipcMain.on('hide-message', () => messageWindow.close());
