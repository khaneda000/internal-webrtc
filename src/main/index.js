'use strict'

import { app, BrowserWindow, session, ipcMain } from 'electron'
import path from 'path'
import nodeNotifier from 'node-notifier'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  if (process.env.NODE_ENV === 'production') {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, c) => {
      details.requestHeaders['Origin'] = 'electron://localhost'
      c({ancel: false, requestHeaders: details.requestHeaders})
    })
  }

  var extensionDir = path.join(__static, '/chrome-extension')
  console.log('extension Dir', extensionDir)

  // BrowserWindow.addDevToolsExtension('/Users/kentaro.haneda/Library/Application Support/Google/Chrome/Default/Extensions/blpcfgokakmgnkcojhhkbfbldkacnbeo/4.2.8_0/')
  BrowserWindow.addDevToolsExtension(extensionDir)

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1060,
    resizable: false,
    frame: false,
    transparent: true
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

nodeNotifier.on('click', function (notifierObject, options) {
  console.log('notification click')
})

nodeNotifier.on('timeout', function (notifierObject, options) {
  console.log('notification timeout')
})

// call from renderer

ipcMain.on('send-notification', (event, arg) => {
  nodeNotifier.notify({
    title: '入室',
    message: 'wanwanさんが入りました',
    icon: 'file://' + __static + '/img/icon.png',
    contentImage: 'file://' + __static + '/img/icon.png'
  }, function (err, response) {
    console.log('error', err, response)
  })

  console.log(
    event, arg
  )
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
