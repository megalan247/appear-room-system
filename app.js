const CDP = require('chrome-remote-interface');
const express = require('express');
const web = express();
const R = require("rambdax");
const spawn = require('child_process').spawn;
const electron = require('electron');
const {app, BrowserWindow} = electron;  // Module to control application life.

web.get('/openAppear', openAppear);
web.get('/startScreenShare', startScreenShare);
web.get('/stopScreenShare', stopScreenShare);
web.get('/closeAppear', closeAppear);


web.listen(3000, () => console.log('Example app listening on port 3000!'))

async function openAppear() {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'https://appear.in/testourzeitz'});
        await Page.loadEventFired();
        
        
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function startScreenShare() {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName(\'VideoToolbar-item--screenshare\')[0].click();'})
        await R.delay(2000);
        spawn(__dirname + '\\bin\\testchrome.exe');
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function stopScreenShare() {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName(\'VideoToolbar-item--screenshare\')[0].click();'})
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function closeAppear() {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'https://trivago.de'});
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow(
      {
          width: 1280,
          height: 720
      }
  );

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/webcam.html');

  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
