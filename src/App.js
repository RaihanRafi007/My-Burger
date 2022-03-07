import React from "react";
import { Provider } from "react-redux";
import { store } from "./Component/redux/store";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Component/Main";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
