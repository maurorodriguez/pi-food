import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MainRoute from './components/MainRoute/MainRoute';
import DetailRecipe from './components/DetailRecipe/DetailRecipe';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={MainRoute} />
        <Route path="/recipe/detail/:id" exact component={DetailRecipe} />
        <Route path="/recipe/create" exact component={CreateRecipe} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
