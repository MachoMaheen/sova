// import { contextBridge, ipcRenderer } from "electron";

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld("electronAPI", {
//   // Device management
//   getDevices: () => ipcRenderer.invoke("get-devices"),
  
//   // Scheduled deletes
//   getScheduledDeletes: () => ipcRenderer.invoke("get-scheduled-deletes"),
  
//   // Delete operations
//   deleteFiles: (paths: string[]) => ipcRenderer.invoke("delete-files", paths),
//   scheduleDelete: (paths: string[], date: string) =>
//     ipcRenderer.invoke("schedule-delete", paths, date),
  
//   // Subscription management
//   getSubscription: () => ipcRenderer.invoke("get-subscription"),
// });


import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // Device management
  getDevices: () => ipcRenderer.invoke("get-devices"),
  
  // Scheduled deletes
  getScheduledDeletes: () => ipcRenderer.invoke("get-scheduled-deletes"),
  
  // Delete operations
  deleteFiles: (paths: string[]) => ipcRenderer.invoke("delete-files", paths),
  scheduleDelete: (paths: string[], date: string) =>
    ipcRenderer.invoke("schedule-delete", paths, date),
  
  // Subscription management
  getSubscription: () => ipcRenderer.invoke("get-subscription"),
});