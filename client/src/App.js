import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import MainRoute from './components/MainRoute/MainRoute'
import DetailRecipe from './components/DetailRecipe/DetailRecipe'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={LandingPage} />
      <Route path='/home' exact component={MainRoute} />
      <Route path='/recipe/detail/:id' exact component={DetailRecipe} />
      <Route path='/recipe/create' exact component={CreateRecipe} />
    </div>
  );
}

export default App;
