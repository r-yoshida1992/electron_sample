import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Box, Button} from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <Button
              sx={{
              width:"100px",
              height:"100px",
          }}
              onClick={()=>{
                  alert(1)
              }}
          >
              button
          </Button>
      </header>
    </div>
  );
}

export default App;
