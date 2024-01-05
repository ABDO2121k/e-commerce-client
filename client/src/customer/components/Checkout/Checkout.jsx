import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import AdressForm from "../AddDeliveryAdress/AdressForm";
import OrderSummary from "./OrderSummary";
import Paypal from "../paypal/Paypal";

export default function Checkout() {
  const navigate=useNavigate()
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step");
  const [steps, setSteps] = React.useState([
    "Login",
    " Address",
    "Checkout",
    "Success",
  ]);
  return (
    <div className="px-10 py-10 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            </Box>
            <div className="mt-6 py-4">
              {step == 2 ? (
                <AdressForm />
              ) : step == 3? (
                <Paypal />
              ) : (
                <OrderSummary />
              )}
            </div>
          </React.Fragment>
      </Box>
    </div>
  );
}
