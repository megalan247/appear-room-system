const CDP = require('chrome-remote-interface');
const express = require('express');
const app = express();
const R = require("rambdax");
var spawn = require('child_process').spawn;

app.get('/openAppear', openAppear);
app.get('/startScreenShare', startScreenShare);
app.get('/stopScreenShare', stopScreenShare);
app.get('/closeAppear', closeAppear);


app.listen(3000, () => console.log('Example app listening on port 3000!'))

async function openAppear() {
    try {
        // connect to endpoint
        let client = await CDP();
        // extract domains
        const {Network, Page, Runtime} = client;
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'https://appear.in/rory-trivago'});
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
