import React from "react";

const PButton = (props) => {
  return (
    <props.bname variant="contained" disableRipple>
      {props.title}
    </props.bname>
  );
};

export default PButton;
