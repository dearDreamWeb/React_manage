import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/home/index";
import Login from "./views/login/index";
import NotFound from "./views/notFound/index";  // 404页面
import './App.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => (
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/product/manage" component={Home}></Route>
              <Route path="/product/categories" component={Home}></Route>
              <Route path="/order/manage" component={Home}></Route>
              <Route path="/users/manage" component={Home}></Route>
              <Route path="/users/list" component={Home}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          )}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
