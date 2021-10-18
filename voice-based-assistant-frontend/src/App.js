import "bootstrap/dist/css/bootstrap.css"; 
import Login from "./Login";
import About from "./About";
import Register from "./Register";
import Main from "./Main";
import {Route, Switch} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/main" component={Main}/>
      </Switch>
      </div>
  );
}

export default App;
