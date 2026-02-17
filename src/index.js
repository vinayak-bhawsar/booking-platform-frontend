import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
        <Header />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
    </BrowserRouter>
);
