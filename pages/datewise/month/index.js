import { Container, Title, Accordion, Text, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { HeaderCT } from "../../../components";

import { monthWiseData } from "../../../utils";
import useStyles from "./style";

const getDays = (data = [], month, year) => {
  return data.map((d, key) => {
    return (
      <Link
        key={key}
        href={{
          pathname: "/datewise/day",
          query: { day: d.day, month, year },
        }}
      >
        <Button mt={5} fullWidth color={key % 2 == 0 ? "pink" : "blue"}>
          <Text align="center">
            {d.day} ({d.total})
          </Text>
        </Button>
      </Link>
    );
  });
};

const Month = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const { month, year } = router.query;
  const [monthData, setMonthData] = useState(monthWiseData || []);

  const rowData = monthData.find(
    (item) => item.year == year && item.month == month
  );

  return (
    <>
      <HeaderCT title="Date Wise Details" />
      <div className={classes.innerLayout}>
        <Link
          href={{
            pathname: "/datewise/year",
          }}
        >
          <Button color="teal">
            <Text align="center">Back</Text>
          </Button>
        </Link>
        {getDays(rowData && rowData.days, month, year)}
      </div>
    </>
  );
};

export default Month;
