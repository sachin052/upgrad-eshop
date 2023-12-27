import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SortByComponent = ({ onSortChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Select
      onChange={handleChange}
      value={selectedValue}
      displayEmpty
      sx={{ width: 200 }}
      inputProps={{ "aria-label": "Select value" }}
    >
      <MenuItem value="" disabled>
        Select an option
      </MenuItem>
      {["Default", "Price: High to Low", "Price: Low to High", "Newest"].map(
        (item, index) => (
          <MenuItem value={item}>{item}</MenuItem>
        )
      )}
    </Select>
  );
};

export default SortByComponent;
