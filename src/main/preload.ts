import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // We'll add methods here as needed for file operations

  // Example methods for the LMN8 app
  getDevices: () => ipcRenderer.invoke("get-devices"),
  getScheduledDeletes: () => ipcRenderer.invoke("get-scheduled-deletes"),
  deleteFiles: (paths: string[]) => ipcRenderer.invoke("delete-files", paths),
  scheduleDelete: (paths: string[], date: string) =>
    ipcRenderer.invoke("schedule-delete", paths, date),
  configureAutoDelete: (config: any) =>
    ipcRenderer.invoke("configure-auto-delete", config),

  // Device synchronization
  registerDevice: (deviceInfo: any) =>
    ipcRenderer.invoke("register-device", deviceInfo),
  syncDevices: () => ipcRenderer.invoke("sync-devices"),

  // Subscription management
  getSubscription: () => ipcRenderer.invoke("get-subscription"),
  upgradeSubscription: (plan: string) =>
    ipcRenderer.invoke("upgrade-subscription", plan),
});
