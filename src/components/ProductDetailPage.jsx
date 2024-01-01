import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ComplexGrid() {
  const navigate= useNavigate();
  // Step 1: Declare state variables
  const [qty, setQty] = useState(0)
  const [alignment, setAlignment] = useState("web");
  const [product, setProduct] = useState({
    id: "658af6b28017b41b516cda89",
    name: "Salmon - Atlantic, Skin On",
    category: "food",
    price: 2670.12,
    description:
      "Subluxation of unspecified parts of right shoulder girdle, sequela",
    manufacturer: "Hyundai",
    availableItems: 54,
    imageUrl: "http://dummyimage.com/238x100.png/5fa2dd/ffffff",
  });
  const { productId } = useParams();
  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        // Make the API request to fetch products
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );

        // Check if the response is successful (status code 200)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProductDetail();
  }, [productId]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
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

      <Paper
        sx={{
          display: "flex",       // Center the child elements horizontally
          flexDirection: "column", // Stack child elements vertically
          alignItems: "center",  // Center the child elements vertically
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
        elevation={0}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
          }}
        >
          <Img
            alt="complex"
            src={product.imageUrl}
            sx={{ width: 200, height: 300 }}
          />
          <Box sx={{marginLeft:10,flexDirection: "column" ,display: "flex", alignItems: "flex-start" }}>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginRight: 2 }}>{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
              />
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <Typography>
                {" "}
                Category: <b>{product.category}</b>
              </Typography>
            </Box>
            <Typography sx={{ marginTop: 2 }}>
              {" "}
              {product.description}
            </Typography>
            <Typography sx={{ marginTop: 3 }}>
              {" "}
              {`RS, ${product.price}`}
            </Typography>
            <TextField
            sx={{ marginTop: 2, marginBottom: 2 }} 
              required
              onChange={(event)=>setQty(event.target.value)}
              id="outlined-required"
              label="Enter Quantity"
              defaultValue="1"/>
            <Button sx={{ marginTop: 2, marginBottom: 2 }}  variant="contained" onClick={(e)=>{
              navigate(`/orderPage/${productId}/${qty}`);
            }} >
              PLACE ORDER
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
