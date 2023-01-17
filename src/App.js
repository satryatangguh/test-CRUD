import './App.css';
import React from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainPage/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
