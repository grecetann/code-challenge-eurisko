import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
