import React from "react";
import { HeaderCT, SimpleTable } from "../../components";
import { partysArray } from "../../utils/dummydata";
import useStyles from "./style";

const Partys = () => {
  const { classes } = useStyles();

  const upPartyArr = partysArray.filter((d, idx) => (d.id = idx + 1));

  const tblObj = {
    displayFields: ["id", "company"],
    fixedWidthColumn: ["id"],
    numberFields: ["id"],
    showOperations: true
  }

  return (
    <>
      <HeaderCT />
      <div className={classes.innerLayout}>
        <SimpleTable
          data={upPartyArr}
          tblObj={tblObj}
        />
      </div>
    </>
  );
};

export default Partys;
