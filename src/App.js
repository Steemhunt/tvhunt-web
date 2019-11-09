import React from "react";
import Routes from "./Routes";
import { hot } from 'react-hot-loader/root'
import './custom.css';

function App() {
  return <Routes />;
}

export default process.env.NODE_ENV === "development" ? hot(App) : App