import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from "@mui/material/Toolbar";
import { ShoppingCart } from "@mui/icons-material";
import{SearchBox,SearchIconWrapper,StyledInputBase} from "./styledComponents";
import SearchIcon from "@mui/icons-material/Search";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


function ResponsiveAppBar() {

  return (
    <AppBar position="static">
        <Toolbar>
          <ShoppingCart />

          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            UpGrad E Shop
          </Typography>

          <Container sx={{ width: '20%'  }}>
          {/* <SearchBox  >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBox> */}
          </Container>
          <Box
              sx={{
                typography: 'body1',
                '& > :not(style) ~ :not(style)': {
                  ml: 2,
                },
              }}
            >
              <Link  color="inherit" href="/" >Login</Link>
              <Link  color="inherit" href="/signup" >SignUp</Link>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
export default ResponsiveAppBar;
