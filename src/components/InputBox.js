import React from "react";
import TextField from "@mui/material/TextField";

const InputBox = ({ label, variant, className }) => {
  return <TextField className={className} label={label} variant={variant} />;
};

export default InputBox;
