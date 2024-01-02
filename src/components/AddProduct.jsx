import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreatableSelect from 'react-select/creatable';
//import { colourOptions } from '../data';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function AddProduct() {
  return (
    <center><div>
            <h2>Add Product</h2>
            <Stack spacing={2} width='50%'>
                <Item>
                    <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    />
                </Item>
                <Item>
                    <CreatableSelect isClearable />
                </Item>
                <Item>
                <TextField
                    required
                    id="outlined-required"
                    label="Manufacturer"
                    />
                </Item>
                <Item>
                <TextField
                    required
                    id="outlined-required"
                    label="Avaiable Items"
                    type="number"
                    />
                </Item>
                <Item>
                
                <TextField
                    required
                    id="outlined-required"
                    label="Price"
                    type="number"
                    />
                </Item>
                <Item>
                <TextField
                    required
                    id="outlined-required"
                    label="Image URL"
                    type="url"
                    />
                </Item>
                <Item>
                <TextField
                    required
                    id="outlined-required"
                    label="Product Description"
                    type="url"
                    />
                </Item>
                <Item>
                <Button variant="contained" href="/orderPage">SAVE PRODUCT</Button>
                </Item>
            </Stack>
        
      </div></center>
  )
}
