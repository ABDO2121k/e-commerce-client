import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { useRef } from "react";
const Register = () => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const formRef=useRef()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const register = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };
      toast.loading("registring In", { id: "login" });
      await auth?.signup(register);
      toast.success("registered with success", { id: "login" });
      return formRef.current.reset()
    } catch (err) {
      console.log("error: ", err);
      toast.error("registring in failed ", { id: "login" });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
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
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ mt: 2, bgcolor: "rgb(145 85 253)" }}
              size="large"
              variant="contained"
              type="submit"
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <div className="flex py-4 justify-center">
          <p>if you already have an account ?</p>
          <Button
            sx={{ color: "rgb(145 85 253)", padding: "0" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
