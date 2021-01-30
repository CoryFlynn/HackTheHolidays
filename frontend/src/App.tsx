import React from "react";
import "./App.css";
import { Symfoni } from "./hardhat/SymfoniContext";
import { Shew } from "./components/ShewStore";

function App() {
  return (
    <div className="App">
      <Symfoni autoInit={true}>
        <Shew />
      </Symfoni>
    </div>
  );
}

export default App;
