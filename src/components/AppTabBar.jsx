import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { ShoppingCart } from "@mui/icons-material";
import {
  SearchBox,
  SearchIconWrapper,
  StyledInputBase,
} from "./styledComponents";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSearch } from "../common/SearchContext";


const ResponsiveAppBar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = React.useState();
  const [userType, setUserType] = React.useState();
  const reload = Cookies.get("authToken");
  React.useEffect(() => {
    setAuthToken(Cookies.get("authToken"));
    setUserType(Cookies.get("userType"));
  }, [reload]);
  const { updateSearchTerm } = useSearch();
  const handleSearch = (e) => {
    updateSearchTerm(e.target.value);
  };
  return (
    <AppBar position="static" sx={{ background: "#3f51b5" }}>
      <Toolbar>
        <ShoppingCart />

        <Typography
          variant="subtitle1"
          component="div"
          sx={{ flexGrow: 0, ml: 1 }}
        >
          UpGrad E Shop
        </Typography>

        <Container sx={{ width: "30%" }}>
          {authToken !== undefined && (
            <SearchBox > 
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </SearchBox>
          )}
        </Container>
        <Box
          sx={{
            typography: "body1",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
        >
          {authToken !== undefined && (
            <Link color="inherit" href="/signup">
              Home
            </Link>
          )}
          {authToken === undefined && (
            <Link color="inherit" href="/">
              Login
            </Link>
          )}
          {authToken === undefined && (
            <Link color="inherit" href="/signup">
              SignUp
            </Link>
          )}
          {userType === "ADMIN" && (
            <Link color="inherit" href="/addProduct">
              Add Product
            </Link>
          )}
          {authToken !== undefined && (
            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                // To remove all cookies
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                      /=.*/,
                      "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
                });
                setAuthToken(undefined);
                setUserType(undefined);
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
