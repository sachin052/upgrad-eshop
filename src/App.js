import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { ShoppingCart } from "@mui/icons-material";
import Login from "./common/Login"; // Update the path accordingly
import SignUp from "./common/SignUp";
import{SearchBox,SearchIconWrapper,StyledInputBase} from './comonents/styledComponents'
import SearchIcon from "@mui/icons-material/Search";
import HomePage from "./common/HomePage";
import SortByComponent from "./comonents/SortByComponent";
import { Stack } from "@mui/material";

const App = () => {
  const [currentPage,setCurrentPage]=useState("Login");
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <ShoppingCart />

          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            UpGrad E Shop
          </Typography>

          <Container sx={{ width: '20%'  }}>
          <SearchBox  >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBox>
          </Container>

          <Stack direction="row" spacing={2}>
          <Button color="inherit" sx={{textTransform:"none"}}>Home</Button>
          <Button color="inherit" sx={{textTransform:"none"}}>Add Product</Button>
          <Button  variant="contained"color="error" onClick={(e)=>{
            if(currentPage==="Login")
              setCurrentPage("SignUp")
              else setCurrentPage("Login")
          }}>Login</Button>
          </Stack>
          
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          minHeight: "80vh",
          minWidth:"80vw",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        {currentPage==="Login"?<Login/>:<SignUp/>}

        {/* <HomePage/> */}
      </Box>
    </Box>
  );
};

export default App;
