import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function MediaCard({id,image,title,heading,price,onClickBuy}) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 140}}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Box display='flex' justifyContent='space-between'>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`Rs.`+price}
        </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {heading}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={(e)=>{
          onClickBuy();
        }}>Buy</Button>
        
      </CardActions>
    </Card>
  );
}
