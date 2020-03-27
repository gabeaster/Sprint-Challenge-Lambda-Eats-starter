import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <h2>Lambda Eats Presents</h2>
      <h1>BUILD YOUR OWN PIZZA</h1>
      <img className="eatImg" src={"https://images.unsplash.com/photo-1486485764572-92b96f21882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"} alt={"neon sign that reads Eat What Makes You Happy"}/>
      <Link className="linkToPizza" to={"/pizza"}>
          <div className="clickToBuild">Get to Buildin'</div>
      </Link>
    </>
  );
};
export default Home;