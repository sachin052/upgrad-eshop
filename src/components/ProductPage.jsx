import React, { useEffect, useState } from "react";
import ShoppingCardItem from "./ShoppingCardItem";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SortByComponent from "./SortByComponent";
import MediaCard from "./ShoppingCardItem";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate=useNavigate();
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make the API request to fetch products
        const response = await fetch('http://localhost:8080/api/products');
        
        // Check if the response is successful (status code 200)
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);

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
        {products.map((e, index) => (
          <Grid  xs={4}key={index} >
            <MediaCard id={e.id} image={e.imageUrl} heading={e.description} title={e.name} price={e.price} onClickBuy={(_)=>{
              const id =e.id;
              navigate(`/buy/${id}`); // Corrected string interpolation
            }}/>
          </Grid>
        ))}
      </Grid>
      </Box>
    </div>
  );
}
