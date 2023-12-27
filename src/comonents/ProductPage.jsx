import React from 'react'
import ShoppingCardItem from "./ShoppingCardItem";
import Grid from '@mui/material/Unstable_Grid2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SortByComponent from './SortByComponent';


export default function ProductPage() {
    const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
  return (
    <div>
        <center><ToggleButtonGroup
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
        </ToggleButtonGroup></center>
        <p>Sort by:</p>
           <SortByComponent onChange={(e)=>{

           }}/>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
                <Grid xs={4}>
                    <Item><ShoppingCardItem/></Item>
                </Grid>
            </Grid>
    </div>
       
      
    
  )
}
