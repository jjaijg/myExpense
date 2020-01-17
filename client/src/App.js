import React from "react";
import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import Transactions from "./components/Transactions";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Transactions />
    </div>
  );
}

export default App;
