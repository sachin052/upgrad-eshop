import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function OrderPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
  const [address, setAddress] = React.useState('');

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Address"
                onChange={handleChange}
                >
                <MenuItem value={10}>1st Address</MenuItem>
                <MenuItem value={20}>2nd Address</MenuItem>
                <MenuItem value={30}>3rd Address</MenuItem>
            </Select>
        </FormControl>
        <div><center>-OR-</center></div>
      {activeStep === steps.length ? (
                                        <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                        </Box>
                                        </React.Fragment>
                                        ) : (
                                                <React.Fragment>
                                                <Typography sx={{ mt: 2, mb: 1 }}>
                                                    {/* steps action     */}
                                                    <center>
                                                        <h3>Add Address</h3>
                                                        <Box component="form" noValidate sx={{ mt: 3 }}>
                                                            <Grid container spacing={2}>
                                                            <Grid item xs={12} >
                                                                <TextField
                                                                autoComplete="given-name"
                                                                name="Name"
                                                                required
                                                                fullWidth
                                                                id="Name"
                                                                label="Name"
                                                                autoFocus
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                name="Contact Number"
                                                                label="Contact Number"
                                                                type="ContactNumber"
                                                                id="ContactNumber"
                                                                autoComplete="ContactNumber"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                id="street"
                                                                label="Street"
                                                                name="street"
                                                                autoComplete="street"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                id="City"
                                                                label="City"
                                                                name="City"
                                                                autoComplete="City"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                name="State"
                                                                label="State"
                                                                type="State"
                                                                id="State"
                                                                autoComplete="State"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                name="Landmark"
                                                                label="Landmark"
                                                                type="Landmark"
                                                                id="Landmark"
                                                                autoComplete="Landmark"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                required
                                                                fullWidth
                                                                name="ZipCode"
                                                                label="Zip Code"
                                                                type="ZipCode"
                                                                id="ZipCode"
                                                                autoComplete="ZipCode"
                                                                />
                                                            </Grid>
                                                            
                                                            </Grid>
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
                                                 </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                
                                                    <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                    >
                                                    Back
                                                    </Button>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    

                                                    <Button onClick={handleNext}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                
                    </Box>
                    </React.Fragment>
                )
        }
    </Box>
  );
}
