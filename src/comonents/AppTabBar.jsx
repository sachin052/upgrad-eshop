import { Box, Stack, Tab, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

const AppTabBar = ({ onChangeTab }) => {
  const itemList = [
    "All",
    "Apparel",
    "Electronic",
    "Footwear",
    "Personal Care",
  ];
  const [currentTab, changeTab] = useState(itemList[0]);

  const handleChange = (event, newValue) => {
    changeTab(newValue);
    console.log("value is" + newValue);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignContent="center"
      sx={{ width: "100%", marginTop: "10px" }}
    >
      <ToggleButtonGroup
        value={currentTab}
        exclusive
        onChange={handleChange}
      >
        {itemList.map((item, index) => (
          <ToggleButton
            key={index}
            value={item}
            aria-label={item}
            sx={{
                backgroundColor: currentTab === item ? "#ADADAD" : "#FFFFFF",
                border:  "1.0px solid #ADADAD",
                color: currentTab === item ? "white" : "black", 
              }}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default AppTabBar;
