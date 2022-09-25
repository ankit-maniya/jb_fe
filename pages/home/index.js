import { HeaderCT } from "../../components";
import { forwardRef } from "react";
import {
  Group,
  Avatar,
  Text,
  Select,
  Grid,
  NumberInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Bender Bending Rodríguez",
    value: "Bender Bending Rodríguez",
    description: "Fascinated with cooking",
  },

  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    value: "Carol Miller",
    description: "One of the richest people on Earth",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    value: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Spongebob Squarepants",
    value: "Spongebob Squarepants",
    description: "Not just a sponge",
  },
];

// eslint-disable-next-line react/display-name
const SelectPartyItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

// eslint-disable-next-line react/display-name
const SelectCuttingItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const Home = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      partyName: "",
      l_cuttingtype: "",
      price: 0,
      dimonds: 0,
      weight: 0.0,
    },

    validate: {
      partyName: (val) =>
        !val || (val && val.length <= 0) ? "partyName is Required" : null,
      l_cuttingtype: (val) =>
        !val || (val && val.length <= 0) ? "l_cuttingtype is Required" : null,
      price: (val) =>
        !val || (val && val.length <= 0) ? "price is Required" : null,
      dimonds: (val) =>
        !val || (val && val.length <= 0) ? "dimonds is Required" : null,
      weight: (val) =>
        !val || (val && val.length <= 0) ? "weight is Required" : null,
    },
  });

  return (
    <>
      <HeaderCT />
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("calledd", values);
        })}
      >
        <Grid mx={5} grow>
          <Grid.Col md={6} lg={2}>
            <Button>
              Save
            </Button>
          </Grid.Col>
        </Grid>
        <Grid mx={5} grow>
          <Grid.Col md={6} lg={4}>
            <Select
              {...form.getInputProps("partyName")}
              label="Party Name"
              placeholder="Select Party Name"
              itemComponent={SelectPartyItem}
              data={data}
              searchable
              clearable
              maxDropdownHeight={280}
              nothingFound="Nobody here"
              onChange={(value) => {
                console.log("item : ", value);
                form.setFieldValue("partyName", value);
              }}
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
            />
          </Grid.Col>
          <Grid.Col md={6} lg={4}>
            <Select
              {...form.getInputProps("l_cuttingtype")}
              label="Cutting Type"
              placeholder="Select Cutting Type"
              itemComponent={SelectCuttingItem}
              data={data}
              searchable
              clearable
              maxDropdownHeight={280}
              nothingFound="Nobody here"
              onChange={(value) => form.setFieldValue("l_cuttingtype", value)}
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
            />
          </Grid.Col>
          <Grid.Col md={6} lg={4}>
            <NumberInput
              label="Price"
              placeholder="0.0"
              value={form.values.price}
              onChange={(value) => form.setFieldValue("price", value)}
              error={form.errors.price && form.errors.price}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              label="Payment Option"
              placeholder="0.0"
              value={form.values.price}
              onChange={(value) => form.setFieldValue("price", value)}
              error={form.errors.price && form.errors.price}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              label="Date"
              placeholder="0.0"
              value={form.values.price}
              onChange={(value) => form.setFieldValue("price", value)}
              error={form.errors.price && form.errors.price}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              label="Dimond Count"
              placeholder="0"
              value={form.values.dimonds}
              onChange={(value) => form.setFieldValue("dimonds", value)}
              error={form.errors.dimonds && form.errors.dimonds}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              label="Weight"
              placeholder="0.0"
              value={form.values.weight}
              onChange={(value) => form.setFieldValue("weight", value)}
              error={form.errors.weight && form.errors.weight}
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <Button fullWidth type="submit">
              Settings
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};

export default Home;
