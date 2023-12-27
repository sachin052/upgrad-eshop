import { Paper, Typography } from "@mui/material";

const ShoppingCardComponent = ({ name, description }) => {
  return (
    <Paper    sx={{
        width: 300, // Set your desired width
        height: "auto", // Set your desired height or use "auto" for dynamic height based on content
        padding: 2, // Adjust padding as needed
      }}>
      <Typography>{name}</Typography>
      <Typography>{description}</Typography>
    </Paper>
  );
};

export default ShoppingCardComponent;
