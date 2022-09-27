import React from "react";
import { HeaderCT, NotFound404 } from "../../components";
import useStyles from "./style";

const ErrorPage = () => {
  const { classes } = useStyles()
  return (
    <>
      <HeaderCT />
      <div className={classes.innerLayout}>
        <NotFound404 />
      </div>
    </>
  );
};

export default ErrorPage;
