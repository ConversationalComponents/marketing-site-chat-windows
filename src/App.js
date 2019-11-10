import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App container d-flex flex-column">
      <h1>CoCo chat components</h1>
      <Link to="/address">Address</Link>
      <Link to="/address-mobile">Address Mobile</Link>
      <Link to="/scheduler">Scheduler</Link>
      <Link to="/scheduler-mobile">Schduler Mobile</Link>
      <Link to="/feedback">Feedback</Link>
      <Link to="/feedback-mobile">Feedback Mobile</Link>
      <Link to="/demo">Demo</Link>
      <Link to="/demo-mobile">Demo Mobile</Link>
      <Link to="/competition">Competition</Link>
      <Link to="/competition-mobile">Competition Mobile</Link>
    </div>
  );
}

export default App;
