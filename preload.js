const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationAPI: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },
  filesAPI: {
    sendEmails(content) {
      ipcRenderer.send('save-delete', content);
    },
  },
});