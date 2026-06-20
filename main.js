const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 750,
    resizable: true,
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // ซ่อนเมนูบาร์ด้านบน (File, Edit, View) ให้แอปดูคลีนเหมือนเครื่องเล่นจริงๆ
  win.setMenu(null);

  // โหลดหน้าเว็บเครื่องเล่นของคุณ
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});