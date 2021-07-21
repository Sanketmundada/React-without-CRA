import React from "react";
import ReactDOM from "react-dom";
import Table from "./components/Table";
import "tailwindcss/tailwind.css";
// import "./index.css"; /* This syntax works due to style-loader */

const App: React.FC = () => {
  return (
    <>
      <h1>Demo Table</h1>
      <Table />
    </>
  );
};

// Args : React Element, Where to render
ReactDOM.render(<App />, document.getElementById("root"));

/* ROLE OF BABEL */

/* Transform this : <h1>Hello Folks !</h1>; */
/* Into this : React.createElement("h1",null,"Hello Folks !"); */
/* JSX => JS */
/* JSX acts as an abstraction over the createElement */
