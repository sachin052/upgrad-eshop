import React, { useEffect, useState } from "react";
import ShoppingCardItem from "./ShoppingCardItem";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SortByComponent from "../components/SortByComponent";
import MediaCard from "./ShoppingCardItem";
import { Box, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSearch } from "./SearchContext";

export default function ProductPage() {
  const navigate = useNavigate();
  const [currentCat, setCurrentCat] = React.useState("All");
  const [currentSort, setCurrentSort] = React.useState("Newest");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/categories",
          {
            method: "GET",
            headers: {
              "x-auth-token": Cookies.get("authToken"),
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCategories(["All", ...data]); // Add "All" as the first item
        } else {
          console.log("Not Success");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleChangeCategory = (event, cat) => {
    setCurrentCat(cat);
  };

  const handleChangeSort = (event) => {
    setCurrentSort(event.target.value);
  };

  const sortedProducts = () => {
    let sorted = [...products];
    if (currentSort === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } 
    return sorted;
  };

 const filteredProducts =
    currentCat === "All"
      ? sortedProducts().filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sortedProducts()
          .filter((product) => product.category === currentCat)
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
          value={currentCat}
          exclusive
          onChange={handleChangeCategory}
          aria-label="Platform"
          sx={{mt:3}}
        >
          {categories &&
            categories.map((item, index) => (
              <ToggleButton value={item} key={index}>
                {item}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </center>
      <Box mt={2} mb={2} ml={28}>
        <Select value={currentSort} onChange={handleChangeSort}>
          <MenuItem value="Newest">Newest</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          {/* Add more sorting options if needed */}
        </Select>
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={12}
          maxWidth="80%"
        >
          {filteredProducts.map((e, index) => (
            <Grid xs={4} key={index}>
              <MediaCard
                id={e.id}
                image={e.imageUrl}
                heading={e.description}
                title={e.name}
                price={e.price}
                onClickBuy={(_) => {
                  const id = e.id;
                  navigate(`/buy/${id}`);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
