import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./views/home/index"
import './App.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route  path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
