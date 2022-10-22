import React from "react";
import '../Components/styles/helmet.css'

const Helmet = (props) => {
  document.title = "Miky's Deli Restaurant -" + props.title;
  <link rel="canoncial" href="/home" />
  return <div className="helmet m-0 w-100">{props.children}</div>;
};

export default Helmet;