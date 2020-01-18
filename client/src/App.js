import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Transactions />
      </div>
    </Provider>
  );
}

export default App;
