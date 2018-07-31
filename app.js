const CDP = require('chrome-remote-interface');
const express = require('express');
const web = express();
const R = require("rambdax");
const spawn = require('child_process').spawn;

app.get('/', (req, res) => res.render('index.html'))
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
        await Page.navigate({url: 'https://dakboard.com/app/screenPredefined?p=a1dcded12eedd09919c2ee3c240c9a97'});
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Fertig!");
    }
}