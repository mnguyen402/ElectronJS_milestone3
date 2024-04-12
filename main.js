const { app, BrowserWindow, ipcMain } = require("electron"); 
const path = require("path"); 

let mainWindow; 

// Function to create independent window or main window 
function createWindow() { 
mainWindow = new BrowserWindow({ 
	width: 800, 
	height: 600, 
	// Make sure to add webPreferences with 
	// nodeIntegration and contextIsolation 
	webPreferences: { 
	nodeIntegration: true, 
	contextIsolation: false, 
  enableRemoteModule: true,
	}, 
	show: false, 
}); 

// Main window loads index.html file 
mainWindow.loadFile(path.join(__dirname, 'index.html')); 

// To maximize the window 
mainWindow.maximize(); 
mainWindow.show(); 
mainWindow.webContents.openDevTools();
} 

// Function to create child window of parent one 
function createChildWindow() { 
childWindow = new BrowserWindow({ 
	width: 1000, 
	height: 700, 
	modal: true, 
	show: false, 
	parent: mainWindow, // Make sure to add parent window here 

	// Make sure to add webPreferences with below configuration 
	webPreferences: { 
	nodeIntegration: true, 
	contextIsolation: false, 
	enableRemoteModule: true, 
	}, 
}); 

// Child window loads settings.html file 
childWindow.loadFile(path.join(__dirname, 'settings.html')); 

childWindow.webContents.openDevTools();

childWindow.once("ready-to-show", () => { 
	childWindow.show(); 
}); 
} 

ipcMain.on("openChildWindow", (event, arg) => { 
  createChildWindow(); 
});

ipcMain.on("closeCurrentWindow", (event, arg) => { 
  createChildWindow(); 
});

ipcMain.on("valuesChannel", (event, data) => {
    console.log(data)
})

function returnText() {
  let private_Key = document.getElementById("private_Key").value;
  let public_Key = document.getElementById("public_Key").value;
  let ip = document.getElementById("scp_ip").value;
  response_priv = `Private Key: ${private_Key}!`;
  response_pub = `Public Key: ${public_Key}!`;
  response_ip = `IP: ${ip}!`;
  response = response_priv + '\n' + response_pub + '\n' + response_ip
  alert(response)
}

app.whenReady().then(() => { 
createWindow(); 

app.on("activate", () => { 
	if (BrowserWindow.getAllWindows().length === 0) { 
	createWindow(); 
	} 
}); 
}); 

app.on("window-all-closed", () => { 
if (process.platform !== "darwin") { 
	app.quit(); 
} 
}); 
