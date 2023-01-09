import React from "react";
import TextField from "@mui/material/TextField";

const InputBox = ({ label, variant, className, textChange, type, name }) => {
  return (
    <TextField
      name={name}
      type={type}
      onChange={textChange}
      className={className}
      label={label}
      variant={variant}
    />
  );
};

export default InputBox;
