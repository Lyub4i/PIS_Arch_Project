import React, { useEffect } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import { saveUserId } from "./services/localStorage";

function App() {
  useEffect(() => {
    saveUserId(0);
  }, []);

  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
