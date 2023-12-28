import React from "react";
import ShoppingCardItem from "./ShoppingCardItem";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SortByComponent from "./SortByComponent";
import MediaCard from "./ShoppingCardItem";
import { Box } from "@mui/material";

export default function ProductPage() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    price:index*100,
    image: `https://source.unsplash.com/random/200x200?sig=${index + 1}`,
    title: `Card ${index + 1}`,
    heading: `This is the heading for Card ${index + 1}.`,
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <center>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="web">ALL</ToggleButton>
          <ToggleButton value="android">APPAREL</ToggleButton>
          <ToggleButton value="ios">ELECTRONICS</ToggleButton>
          <ToggleButton value="ios">PERSONAL CARE</ToggleButton>
        </ToggleButtonGroup>
      </center>
      <p>Sort by:</p>
      <SortByComponent onChange={(e) => {}} />
      <Box display="flex" justifyContent="center"> 
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center" spacing={12}  maxWidth='80%'      >
        {dummyData.map((e, index) => (
          <Grid item  xs={4}key={index} >
            <MediaCard image={e.image} heading={e.heading} title={e.title} price={e.price} />
          </Grid>
        ))}
      </Grid>
      </Box>
    </div>
  );
}
