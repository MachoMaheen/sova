import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  test: () => 'Hello from preload!'
}); 