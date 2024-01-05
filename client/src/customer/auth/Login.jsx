import { Button, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { toast } from "react-hot-toast";

const Login = () => {
    const navigate=useNavigate()
    const auth=useContext(authContext)
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const data =new FormData(e.target)
        const login={
            email:data.get("email"),
            password:data.get("password")
        }
        toast.loading("signing In", { id: "login" });
        await auth?.login(login)
        toast.success("logged In", { id: "login" });
        setTimeout(()=>{
             navigate(-1)
        },3000)
        if(location.pathname=='/register'|| location.pathname=='/login') navigate('/')
    }catch(err){
      console.log("error: ", err);
     return toast.error(`signing in failed email or password is incorrect`, { id: "login" });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <div className="flex py-4 justify-center">
            <p> don t you have an account ?</p>
            <Button sx={{color: "rgb(145 85 253)",padding:'0'}} onClick={()=>navigate("/register")}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
