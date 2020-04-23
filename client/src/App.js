import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Players from "./views/Players/Players"
import Teams from './views/Teams/Teams'
import Comptool from "./views/Comparison Tool/PlayerComparison"
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Header/Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Players" component={Players} />
        <Route exact path="/Teams" component={Teams} />
        <Route exact path="/Comparison Tool" component={Comptool} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  
  );
}

export default App;
