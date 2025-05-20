// import { app, BrowserWindow, ipcMain } from "electron";
// import * as path from "path";
// import * as fs from "fs";
// import * as os from "os";
// import * as isDev from "electron-is-dev";

// // Keep a global reference of the window object to avoid garbage collection
// let mainWindow: BrowserWindow | null = null;

// function createWindow() {
//   // Create the browser window
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     minWidth: 800,
//     minHeight: 600,
//     webPreferences: {
//       contextIsolation: true,
//       nodeIntegration: false,
//       preload: path.join(__dirname, "preload.js"),
//     },
//     // Remove frame for custom title bar (optional)
//     // frame: false,
//     // titleBarStyle: 'hidden',
//     backgroundColor: "#07102E", // Set background color to match app theme
//   });

//   // Load the app
//   if (isDev) {
//     mainWindow.loadURL("http://localhost:3000");
//     // Open DevTools in development mode
//     mainWindow.webContents.openDevTools();
//   } else {
//     mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
//   }

//   // Handle window close
//   mainWindow.on("closed", () => {
//     mainWindow = null;
//   });
// }

// // Create window when Electron has finished initialization
// app.whenReady().then(() => {
//   createWindow();

//   // On macOS it's common to re-create a window when the dock icon is clicked
//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// // Quit when all windows are closed, except on macOS
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// // IPC Handlers for LMN8 app functionality

// // Get user devices
// ipcMain.handle("get-devices", async () => {
//   // This would normally connect to your backend API
//   // For now, return mock data
//   return [
//     { id: "1", name: "Device 1", email: "device1@mail.com", type: "desktop" },
//     { id: "2", name: "Device 2", email: "device2@mail.com", type: "mobile" },
//     { id: "3", name: "Device 3", email: "device3@mail.com", type: "desktop" },
//   ];
// });

// // Get scheduled deletes
// ipcMain.handle("get-scheduled-deletes", async () => {
//   // This would normally connect to your backend API
//   // For now, return mock data
//   return [
//     {
//       id: "1",
//       type: "Documents",
//       formats: ".png, .jpg, .pdf",
//       date: "25th September at 5:00 PM",
//       paths: ["/path/to/file1.png", "/path/to/file2.jpg"],
//     },
//   ];
// });

// // Delete files (immediate deletion)
// ipcMain.handle("delete-files", async (_, paths: string[]) => {
//   // Implementation would use secure deletion methods
//   // For now, just log the paths that would be deleted
//   console.log("Would securely delete:", paths);
//   return { success: true, deleted: paths.length };
// });

// // Schedule file deletion
// ipcMain.handle("schedule-delete", async (_, paths: string[], date: string) => {
//   // This would normally send to your backend API for scheduling
//   console.log("Scheduled deletion for:", paths, "at", date);
//   return { success: true, scheduled: paths.length, date };
// });

// // Get user subscription
// ipcMain.handle("get-subscription", async () => {
//   // This would normally connect to your backend API
//   // For now, return mock data
//   return { type: "PREMIUM", expiresAt: "2025-12-31" };
// });

// // Register this device
// ipcMain.handle("register-device", async (_, deviceInfo: any) => {
//   // This would normally register with your backend API
//   const hostname = os.hostname();
//   const deviceType = os.platform();

//   console.log("Registering device:", { ...deviceInfo, hostname, deviceType });
//   return { success: true, deviceId: "123456" };
// });

// // Configure secure deletion methods if needed
// function securelyDeleteFile(path: string): Promise<boolean> {
//   // Implement secure deletion (overwrite with random data, etc.)
//   // This is just a placeholder
//   return new Promise((resolve) => {
//     // In a real implementation, you would repeatedly overwrite the file
//     // before deleting it to ensure it can't be recovered
//     try {
//       if (fs.existsSync(path)) {
//         fs.unlinkSync(path);
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       resolve(false);
//     }
//   });
// }

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

// Keep a global reference of the window object to avoid garbage collection
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  console.log("Creating window...");
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#07102E", // Set background color to match app theme
  });

  // Load the app
  if (isDev) {
    console.log("Running in development mode");
    // In development, load from webpack dev server
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    // Open DevTools in development mode
    mainWindow.webContents.openDevTools();
  } else {
    console.log("Running in production mode");
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
  }

  // Log when the window is ready to show
  mainWindow.once("ready-to-show", () => {
    console.log("Window is ready to show");
  });

  // Handle window close
  mainWindow.on("closed", () => {
    console.log("Window closed");
    mainWindow = null;
  });
}

// Create window when Electron has finished initialization
app.whenReady().then(() => {
  console.log("App is ready, creating window...");
  createWindow();

  // On macOS it's common to re-create a window when the dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Handle any uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

// IPC Handlers for LMN8 app functionality

// Get user devices
ipcMain.handle("get-devices", async () => {
  console.log("Handling get-devices request");
  // Mock data for now
  return [
    { id: "1", name: "Device 1", email: "device1@mail.com", type: "desktop" },
    { id: "2", name: "Device 2", email: "device2@mail.com", type: "mobile" },
    { id: "3", name: "Device 3", email: "device3@mail.com", type: "desktop" },
  ];
});

// Get scheduled deletes
ipcMain.handle("get-scheduled-deletes", async () => {
  console.log("Handling get-scheduled-deletes request");
  // Mock data for now
  return [
    {
      id: "1",
      type: "Documents",
      formats: ".png, .jpg, .pdf",
      date: "25th September at 5:00 PM",
      paths: ["/path/to/file1.png", "/path/to/file2.jpg"],
    },
  ];
});

// Get user subscription
ipcMain.handle("get-subscription", async () => {
  console.log("Handling get-subscription request");
  // Mock data for now
  return { type: "PREMIUM", expiresAt: "2025-12-31" };
});
