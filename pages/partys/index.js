import { LoadingOverlay } from "@mantine/core";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderCT, SimpleTable } from "../../components";
import { fetchPartys } from "../../redux/reducers/party/reducer";
import { partysArray } from "../../utils/dummydata";
import useStyles from "./style";

const Partys = () => {
  const { classes } = useStyles();
  const iResParty = useSelector((state) => state.partys);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchPartys());
    };
  }, []);

  const pArr = cloneDeep(iResParty.data);
  const upPartyArr = pArr.map((d, idx) => {
    d["index"] = idx + 1;
    return d;
  });

  const tblObj = {
    displayFields: ["index", "p_name"],
    fixedWidthColumn: ["index"],
    numberFields: ["index", "id", "userid", "isactive", "isdelete", "p_address", "p_email"],
    showOperations: true,
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <LoadingOverlay
          loaderProps={{ variant: "bars" }}
          visible={iResParty.loading}
          overlayBlur={2}
        />
      </div>

      <HeaderCT title="All Partys" />

      <div className={classes.innerLayout}>
        <SimpleTable data={upPartyArr} tblObj={tblObj} />
      </div>
    </>
  );
};

export default Partys;
