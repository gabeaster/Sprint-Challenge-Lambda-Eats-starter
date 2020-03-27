import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

const App = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza" component={Form}/>
    </>
  );
};
export default App;
