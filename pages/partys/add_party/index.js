import React from "react";
import { HeaderCT, SimpleTable } from "../../../components";
import useStyles from "./style";

const AddParty = () => {
  const { classes } = useStyles();

  return (
    <>
      <HeaderCT />
      <div className={classes.innerLayout}>AddParty</div>
    </>
  );
};

export default AddParty;
