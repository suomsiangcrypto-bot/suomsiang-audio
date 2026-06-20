const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 860,
    height: 720,
    frame: false,          // ❌ ตัดขอบหน้าต่างขาวๆ ของ Windows ออก
    transparent: true,     // ✨ ทำให้พื้นหลังนอกกรอบเครื่องเล่นโปร่งใส ทะลุเห็นหน้าจอคอม
    resizable: true,       // 📐 อนุญาตให้ผู้ใช้ดึงยืด-หดขนาดเครื่องเล่นได้ตามต้องการ
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // เปิดให้ JavaScript ในหน้าเว็บสั่งปิดโปรแกรมได้
    }
  });

  win.setMenu(null);
  win.loadFile('index.html');
}

// ระบบรับคำสั่งปิดแอปจากปุ่มกากบาทบนตัวเครื่องเล่น
ipcMain.on('close-app', () => {
  app.quit();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
