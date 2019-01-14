const CDP = require('chrome-remote-interface');
const express = require('express');
const web = express();
const R = require("rambdax");
const spawn = require('child_process').spawn;
require('dotenv').config()

web.set('view engine', 'pug')
web.use(express.static(__dirname + '/static'));
web.set('views', './views')

web.get('/', (req, res) => res.render('start', {name: process.env.ROOM_NAME}));
web.get('/otherRoom', (req, res) => res.render('other',  {name: process.env.ROOM_NAME}));

web.get('/openAppear/:roomName', openAppear);
web.get('/startScreenShare', startScreenShare);
web.get('/stopScreenShare', stopScreenShare);
web.get('/closeAppear', closeAppear);
web.get('/openSettings', openSettings);
web.get('/toggleMute', toggleMute);
web.get('/toggleCam', toggleCam);
web.get('/setVol/:vol', setSysVolume);


web.listen(3000, () => console.log('Example app listening on port 3000!'))

openChrome();

async function openAppear(req, res) {
    try {
        // connect to endpoint

        if(process.env.DEBUG != "Y") {
            let client = await CDP();
            // extract domains
            const {Network, Page, Runtime} = client;
            // enable events then start!
            await Network.enable();
            await Page.enable();
            await Page.navigate({url: 'https://appear.in/' + req.params.roomName});
            await Page.loadEventFired();
        }

        res.render("meeting", {name: req.params.roomName});
        
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function toggleMute(req, res) {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName("VideoToolbar-item--mic")[0].click();'});
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function toggleCam(req, res) {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName("VideoToolbar-item--cam")[0].click();'});
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function openSettings(req, res) {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName("jstest-cam-mic")[0].click();'});
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function startScreenShare(req, res) {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName(\'VideoToolbar-item--screenshare\')[0].click();'});
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function stopScreenShare(req, res) {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Input, Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Runtime.evaluate({expression: 'document.getElementsByClassName(\'VideoToolbar-item--screenshare\')[0].click();'});
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function closeAppear(req, res) {
    try {
        // connect to endpoint
        if(process.env.DEBUG != "Y") {
            let client = await CDP();
            // extract domains
            const {Input, Network, Page, Runtime} = client;
            // enable events then start!
            await Network.enable();
            await Page.enable();
            await Page.navigate({url: 'https://dakboard.com/app/screenPredefined?p=a1dcded12eedd09919c2ee3c240c9a97'});    
        }

        res.redirect("/");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

async function setSysVolume(req, res) {
    try {
        var volLevel = 65535 * (req.params.vol / 100)
        var prc = spawn('./bin/nircmdc.exe',  ['setsysvolume', volLevel], { windowsVerbatimArguments: true });
        res.send("done");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}

function openChrome() {
    if(process.env.DEBUG != "Y") {
        var prc = spawn('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',  ['--kiosk', '--app=https://dakboard.com/app/screenPredefined?p=a1dcded12eedd09919c2ee3c240c9a97', '--auto-select-desktop-capture-source="' + process.env.SCREEN_NAME + '"', '--remote-debugging-port=9222', '--window-position=' + process.env.X_POS + ',0'], { windowsVerbatimArguments: true });
    }
    
}