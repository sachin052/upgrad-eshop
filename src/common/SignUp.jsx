import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";

const SignUp = () => {
  return (
    <Stack
      spacing={2}
      alignContent="center"
      justifyContent="center"
      sx={{ width: "50%" }}
    >
      <Typography variant="h3">Sign Up</Typography>
      <TextField
        type="text"
        variant="outlined"
        label="First Name"
        onChange={(e) => {}}
      />
      <TextField
        type="text"
        variant="outlined"
        label="Last Name"
        onChange={(e) => {}}
      />
      <TextField
        type="email"
        variant="outlined"
        label="Email"
        onChange={(e) => {}}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Password"
        onChange={(e) => {}}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Confirm Password"
        onChange={(e) => {}}
      />
      <TextField
        type="tel"
        variant="outlined"
        label="Contact"
        onChange={(e) => {}}
      />
      <Button variant="contained">Sign Up</Button>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <Link>Already have an account? Sign In</Link>
      </Box>
    </Stack>
  );
};

export default SignUp;
