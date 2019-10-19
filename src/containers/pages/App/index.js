import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
