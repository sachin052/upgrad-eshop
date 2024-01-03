import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function MediaCard({
  id,
  image,
  title,
  heading,
  price,
  onClickBuy,
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Call the onDelete function to perform the actual delete action
    onDelete();
    handleClose();
  };

  const onDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": Cookies.get("authToken"), // Replace with your authentication token
        },
      });

      if (response.ok) {
        console.log(`Product with ID ${id} deleted successfully.`);
        // Reload the current page after successful deletion
        setState({
          ...state,
          openAlert: true,
          message: `${title} deleted successfully`,
          type:'success'
        });
        window.location.reload();
      } else {
        console.error(`Failed to delete product. Status: ${response.status}`);
        setState({
          ...state,
          openAlert: true,
          message: `${title} deleted failed`,
          type:'error'
        });
        // Handle error cases
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error cases
    }
  };

  const handleEdit = () => {
    // Call the onDelete function to perform the actual delete action
    onEdit();
    handleClose();
  };
  const onEdit = () => {
    console.log(`id is ${id}`);
    navigate(`/addProduct/${id || ""}`);
  };
  const userType = Cookies.get("userType");
  const [state, setState] = React.useState({
    openAlert: false,
    type: "success",
    message: "",
  });
  const { vertical, horizontal, openAlert } = state;

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => {
          setState({ ...state, openAlert: false });
        }}
      >
        <Alert
          onClose={() => setState({ ...state, openAlert: false })}
          severity={state.type}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`Rs.` + price}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {heading}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={(e) => {
            onClickBuy();
          }}
        >
          Buy
        </Button>
        <Box sx={{ display: "flex", flexGrow: "1" }}></Box>
        {userType === "ADMIN" && (
          <IconButton onClick={handleEdit} aria-label="delete">
            <EditIcon />
          </IconButton>
        )}
        {userType === "ADMIN" && (
          <IconButton onClick={handleOpen} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
