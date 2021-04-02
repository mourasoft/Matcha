import React from "react";
// import Creatable from "react-select/lib/Creatable";

import { components } from "react-select";

export const Menu = (props) => {
  const optionSelectedLength = props.getValue().length || 0;

  return (
    <components.Menu {...props}>
      {optionSelectedLength < 5 ? (
        props.children
      ) : (
        <div style={{ margin: 15, textAlign: "center" }}>
          Max limit achieved
        </div>
      )}
    </components.Menu>
  );
};
