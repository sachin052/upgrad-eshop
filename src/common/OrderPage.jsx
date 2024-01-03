import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Navigate, json, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AirlineSeatIndividualSuiteSharp } from "@mui/icons-material";
import { Alert, Card, Snackbar } from "@mui/material";
import jsCookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = ["Items", "Select Address", "Confirm Order"];

export default function OrderPage() {
  const { productId, qty } = useParams();
  const navigate = useNavigate();
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

  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 1 && address === undefined) {
      setState({
        ...state,
        open: true,
        type: "error",
        message: "Please Select Address",
      });
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [address, setAddress] = React.useState();

  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  const [allAddress, setAllAddress] = useState([
    {
      id: "659146ed90fe247fb88d2340",
      name: "",
      contactNumber: "",
      city: "",
      landmark: "",
      street: "",
      state: "",
      zipcode: "12312321",
      user: "658b00e31eb22939e639bd22",
    },
  ]);

  const saveAddress = async (event) => {
    event.preventDefault();
    console.log("Inside saved");
    const data = new FormData(event.currentTarget);
    console.log(`request is ${data}`);
    const addRequest = {
      name: data.get("Name"),
      contactNumber: data.get("ContactNumber"),
      city: data.get("City"),
      landmark: data.get("Landmark"),
      street: data.get("street"),
      state: data.get("State"),
      zipcode: data.get("ZipCode"),
      user: jsCookie.get("userID"),
    };
    console.log(`request is ${JSON.stringify(addRequest)}`);
    try {
      const response = await fetch("http://localhost:8080/api/addresses", {
        method: "POST",
        headers: {
          "x-auth-token": Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addRequest),
      });
      if (response.ok) {
        setAllAddress([...allAddress, await response.json()]);
        setState({
          ...state,
          open: true,
          type: "success",
          message: "Address Added successfully",
        });
      } else {
        console.log("Not Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    const allAddress = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/addresses", {
          method: "GET",
          headers: {
            "x-auth-token": Cookies.get("authToken"),
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setAllAddress(await response.json());
        } else {
          console.log("Not Sucesss");
        }
      } catch (error) {
        console.log(error);
      }
    };
    allAddress();
  }, []);

  const placeOrder = async () => {
    const request = {
      quantity: qty,
      user: jsCookie.get("userID"),
      product: product.id,
      address: allAddress[address].id,
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "x-auth-token": jsCookie.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (response.ok) {
        setState({
          ...state,
          open: true,
          type: "success",
          message: "Order placed successfully",
        });

        setTimeout(() => {
          navigate("/productPage");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [state, setState] = React.useState({
    open: false,
    type: "success",
    message: "",
  });
  const { vertical, horizontal, open } = state;

  return (
    <Box sx={{ margin: 4 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setState({ ...state, open: false });
          // navigate('/productPage')
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

      {/* stepper */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* address selector */}

      {activeStep === steps.length - 1 ? (
        <React.Fragment>
          <Card>
            <Box sx={{ display: "flex", flexDirection: "row", padding: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>Quantity : {qty}</Typography>
                <Typography>{`Category: ${product.category}`}</Typography>
                <Typography>{product.description}</Typography>
                <Typography>{`Total Price: Rs ${product.price}`}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5">{allAddress[address].name}</Typography>
                <Typography>{`Contact : ${allAddress[address].contactNumber}`}</Typography>
                <Typography>{`Street Address:${allAddress[address].street}, ${allAddress[address].landmark}`}</Typography>
                <Typography>{`State: ${allAddress[address].state}`}</Typography>
                <Typography>{`Zip ${allAddress[address].zipcode}`}</Typography>
              </Box>
            </Box>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button>Back</Button>
            <Button
              variant="contained"
              onClick={(e) => {
                placeOrder();
              }}
            >
              Place Order
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <center>
            <FormControl sx={{ marginTop: 4 }} fullWidth>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{mb:3}}>Select</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={address}
                  label="Address"
                  style={{ width: "50%" }}
                  onChange={handleChange}
                >
                  {allAddress &&
                    allAddress.map((item, index) => {
                      return <MenuItem value={index}>{item.state}</MenuItem>;
                    })}
                </Select>
              </Box>
            </FormControl>
            <div>
              <center>
                <Typography sx={{mt:3,mb:3}}>
                -OR-
                </Typography>
              </center>
            </div>
            <Typography>Add Address</Typography>
            <Box
              component="form"
              noValidate
              sx={{
                flexDirection: "column",
                display: "flex",
                width: "30%",
                alignItems: "center",
              }}
              onSubmit={(event) => saveAddress(event)}
            >
              <TextField
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
              <TextField
                required
                fullWidth
                name="ContactNumber"
                label="Contact Number"
                type="ContactNumber"
                id="ContactNumber"
                autoComplete="ContactNumber"
              />
              <TextField
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
              />
              <TextField
                required
                fullWidth
                id="City"
                label="City"
                name="City"
                autoComplete="City"
              />
              <TextField
                required
                fullWidth
                name="State"
                label="State"
                type="State"
                id="State"
                autoComplete="State"
              />
              <TextField
                required
                fullWidth
                name="Landmark"
                label="Landmark"
                type="Landmark"
                id="Landmark"
                autoComplete="Landmark"
              />
              <TextField
                required
                fullWidth
                name="ZipCode"
                label="Zip Code"
                type="ZipCode"
                id="ZipCode"
                autoComplete="ZipCode"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SAVE ADDRESS
              </Button>
            </Box>
          </center>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
