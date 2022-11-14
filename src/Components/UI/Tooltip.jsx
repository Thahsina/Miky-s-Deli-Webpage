import React from "react";

const Tooltip = ({ feature }) => {
  // const { id } = feature.properties;

  return (
    <div>
      <strong>{feature.properties.title}</strong>
      <br />
      <p>{feature.properties.description}</p>
     
    </div>
  );
};

export default Tooltip;