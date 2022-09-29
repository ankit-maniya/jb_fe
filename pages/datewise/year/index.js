import { Accordion, Text, Button } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

import { HeaderCT } from "../../../components";

import { yearWiseData } from "../../../utils";
import useStyles from "./style";

const Year = () => {
  const { classes } = useStyles();
  const [years, setYears] = useState(yearWiseData || []);

  const getMonths = (year, months) => {
    return months.map((d, key) => {
      return (
        <Link
          key={key}
          href={{
            pathname: "/datewise/month",
            query: { year: year, month: d.month },
          }}
        >
          <Button mt={5} fullWidth color={key % 2 == 0 ? "pink" : "blue"}>
            <Text align="center">
              {d.month} ({d.total})
            </Text>
          </Button>
        </Link>
      );
    });
  };

  return (
    <>
      <HeaderCT title="Date Wise Details" />
      <div className={classes.innerLayout}>
        <Accordion variant="separated">
          {years.map((d, key) => {
            return (
              <Accordion.Item
                key={key}
                className={classes.item}
                value={`${d.year}`}
              >
                <Accordion.Control className={classes.alignCenter}>
                  {d.year} ({d.total})
                </Accordion.Control>
                <Accordion.Panel>{getMonths(d.year, d.months)}</Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default Year;
