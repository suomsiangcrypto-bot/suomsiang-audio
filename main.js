const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 862,             // ปรับขนาดหน้าต่างให้พอดีเป๊ะกับความกว้างตัวเครื่องเล่น
    height: 722,            // ปรับขนาดหน้าต่างให้พอดีเป๊ะกับความสูงตัวเครื่องเล่น
    frame: false,           // ลบขอบ Windows ทั่วไปออก
    transparent: true,      // เปิดเคลียร์สีพื้นหลังให้โปร่งใสลอยตัว
    hasShadow: false,       // ❌ ปิดเงาระบบสี่เหลี่ยมของ Windows ที่ทำให้เกิดขอบมืดรอบๆ ตัวเครื่อง
    resizable: true,
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // เปิดทางให้ทำงานร่วมกับปุ่มกดในเว็บได้เสถียร
    }
  });

  win.setMenu(null);
  win.loadFile('index.html');
}

// ✕ คำสั่งปิดโปรแกรมถาวร
ipcMain.on('close-app', () => {
  app.quit();
});

// — คำสั่งย่อโปรแกรมลงไปพักไว้ที่ทาสก์บาร์
ipcMain.on('minimize-app', () => {
  if (win) win.minimize();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});