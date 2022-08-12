import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/createDog';
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
          <Route exact path="/dogs/:id" component={DogDetail}/>
          <Route path="/dogs" component={CreateDog}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
