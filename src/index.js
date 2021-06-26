import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import awsExports from "./aws-exports";
import Amplify from "aws-amplify";
import { AppProvider } from "./context";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
