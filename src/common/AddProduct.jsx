import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { Alert, Autocomplete, Box, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    manufacturer: "",
    availableItems: 0,
    price: 0,
    imageUrl: "",
    description: "",
    category: "",
  });

  const { id } = useParams();

  const handleChange = (event, value) => {
    setCurrentCategory(value);
  };

  useEffect(() => {
    const fetchData = async () => {
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
          setCategories(await response.json());
        } else {
          console.log("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
          setCurrentCategory(data.category);
        } else {
          console.error("Failed to fetch product detail");
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchData();
    if (id) {
      fetchProductDetail();
    }
  }, [id]);
  const handleSaveProduct = async () => {
    try {
      const url = id
        ? `http://localhost:8080/api/products/${id}`
        : "http://localhost:8080/api/products";

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": Cookies.get("authToken"),
        },
        body: JSON.stringify({
          ...product,
          category: currentCategory,
          id: undefined,
        }),
      });

      if (response.ok) {
        console.log("Product saved successfully!");
        const message=id? `${product.name} modified Successfully` : `${product.name} added Successfully`
        setState({
          ...state,
          open: true,
          message: message,
          type:'success'
        });
        setTimeout(() => {
            navigate('/productPage')
        }, 1000);

        // Redirect to another page or perform additional actions if needed
      } else {
        console.error("Failed to save product");
        setState({
            ...state,
            open: true,
            message: "Failed to save product",
            type:'error'
          });
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  const [state, setState] = React.useState({
    open: false,
    type: "success",
    message: "",
  });
  const { vertical, horizontal, open } = state;

  return (
    <center>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setState({ ...state, open: false });
           
          }}
        >
          <Alert
            onClose={() => setState({ ...state, open: false })}
            severity={state.type}
            sx={{ width: "100%" }}
          >
            {state.message}
          </Alert>
        </Snackbar>

        {id===undefined?<h2>Add Product</h2>:<h2>Modify Product</h2>}
        <Stack spacing={2} width="50%">
          <TextField
            required
            id="outlined-required"
            label="Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          {categories && (
            <Autocomplete
              value={currentCategory}
              onChange={handleChange}
              options={categories}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Category" variant="outlined" />
              )}
            />
          )}

          <TextField
            required
            id="outlined-required"
            label="Manufacturer"
            value={product.manufacturer}
            onChange={(e) =>
              setProduct({ ...product, manufacturer: e.target.value })
            }
          />

          <TextField
            required
            id="outlined-required"
            label="Available Items"
            type="number"
            value={product.availableItems}
            onChange={(e) =>
              setProduct({
                ...product,
                availableItems: parseInt(e.target.value, 10),
              })
            }
          />

          <TextField
            required
            id="outlined-required"
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
          />

          <TextField
            required
            id="outlined-required"
            label="Image URL"
            type="url"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
          />

          <TextField
            required
            id="outlined-required"
            label="Product Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <Button variant="contained" onClick={handleSaveProduct}>
            {id===undefined?`Add Product`:`Modify Product`}
          </Button>
        </Stack>
      </div>
    </center>
  );
}
