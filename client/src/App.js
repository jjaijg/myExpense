import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Container } from "reactstrap";

import AppNavbar from "./components/AppNavbar";
import Transactions from "./components/Transactions";
import TransactionModal from "./components/TransactionModal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <TransactionModal />
          <Transactions />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
