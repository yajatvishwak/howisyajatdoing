import "./App.scss";
import Home from "./Home";
import { Route } from "wouter";
import Enter from "./Enter";

function App() {
  return (
    <div>
      <Route path="/enter" component={Enter} />
      <Route path="/" component={Home} />
    </div>
  );
}

export default App;
