const {app, BrowserWindow, ipcMain, Menu} = require("electron");
const path = require("path");

let mainWindow;
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

    // call application menu

    Menu.setApplicationMenu(mainmenu);

// Main window loads index.html file 
mainWindow.loadFile(path.join(__dirname, 'index.html')); 

// To maximize the window 
mainWindow.maximize(); 
mainWindow.show(); 
//mainWindow.webContents.openDevTools();
} 

// create application menu

const template = [
    {
        label: 'Virtual File Browser Menu',
        submenu: [
            { label: 'Add Storage',
              click() {
                let addstoragewindow;
                addstoragewindow = new BrowserWindow({ 
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
                addstoragewindow.loadFile(path.join(__dirname, 'addstorage.html')); 

                // To maximize the window 
                addstoragewindow.maximize(); 
                addstoragewindow.show(); 
                function returnaddstorageText() {
                    let private_Key_location = document.getElementById("private_Key_location").value;
                    let public_Key_location = document.getElementById("public_Key_location").value;
                    let hostname_ip = document.getElementById("hostname_ip").value;
                    let username_id = document.getElementById("username_id").value;
                    let storagename_id = document.getElementById("storagename_id").value;
                    add_response_priv = `Private Key location: ${private_Key_location}!`;
                    add_response_pub = `Public Key location: ${public_Key_location}!`;
                    add_response_ip = `IP: ${hostname_ip}!`;
                    add_response_userid = `Public Key location: ${username_id}!`;
                    add_response_storageid = `Public Key location: ${storagename_id}!`;
                    add_response = add_response_priv + '\n' + add_response_pub + '\n' + add_response_ip + '\n' + add_response_userid + '\n' + add_response_storageid
                    alert(add_response)
                  }
                  addstoragewindow.on('closed', function(){
                    app.quit();
                  });
              }
               
             },                            
            { label: 'List Storage',
            click() {
                let liststoragewindow;
                liststoragewindow = new BrowserWindow({ 
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
                liststoragewindow.loadFile(path.join(__dirname, 'liststorage.html')); 

                // To maximize the window 
                liststoragewindow.maximize(); 
                liststoragewindow.show(); 
                liststoragewindow.on('closed', function(){
                  app.quit();
                });
              }
         },               
            { label: 'Browse Files',
            click() {
                let browsefileswindow;
                browsefileswindow = new BrowserWindow({ 
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
                browsefileswindow.loadFile(path.join(__dirname, 'browsefiles.html')); 

                // To maximize the window 
                browsefileswindow.maximize(); 
                browsefileswindow.show(); 
                browsefileswindow.on('closed', function(){
                  app.quit();
                });
              }
        },         
            { label: 'Copy Files',
            click() {
                let copyfileswindow;
                copyfileswindow = new BrowserWindow({ 
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
                copyfileswindow.loadFile(path.join(__dirname, 'copyfiles.html')); 

                // To maximize the window 
                copyfileswindow.maximize(); 
                copyfileswindow.show(); 
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
                  copyfileswindow.on('closed', function(){
                    app.quit();
                  });
              }
        }         
                         
                       ]
    }

]

if (process.platform == 'darwin') {
  template.unshift({});
}
const mainmenu = Menu.buildFromTemplate(template);



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
