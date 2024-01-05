import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../../../context/authContext";
const AdressForm = () => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  // loader
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // end loader
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const data = new FormData(e.target);
    const adress = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      adress: data.get("adress"),
      city: `${data.get("city")},${data.get("region")}`,
      codePostal: data.get("codePostal"),
      phone: data.get("phone"),
    };
    try {
      const data = { addresse: adress };
      const res = await auth?.createOrder(data);
      setOpen(false);
      return navigate(`/checkout/?step=3&order_id=${res._id}`);
    } catch (err) {
      console.log("order ERR", err);
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div>
      <Grid container spacing={4} className="items-center justify-center">
        {/* loader */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* end loader */}
        {/* <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AdressCard />
            <Button
              sx={{ mt: 2, bgcolor: "rgb(145 85 253)" }}
              size="large"
              variant="contained"
              onClick={handleSubmit2}
            >
              {" "}
              Deliver Here
            </Button>
          </div>
        </Grid> */}
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="adress"
                    name="adress"
                    label="Adress"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="region"
                    name="region"
                    label="Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="codePostal"
                    name="codePostal"
                    label="Code Postal"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ mt: 2, bgcolor: "rgb(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here 
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdressForm;
