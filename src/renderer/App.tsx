import * as React from "react";
import HomeScreen from "./components/HomeScreen";
import "./index.css";

/**
 * Main App component for LMN8 Desktop Client
 * 
 * This is the entry point for the renderer process
 * LMN8 is an application for managing and securing data across multiple devices
 */
const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;