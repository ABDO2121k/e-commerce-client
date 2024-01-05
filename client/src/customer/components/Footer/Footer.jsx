import { Button, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Company{" "}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {" "}
              About{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Blog{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Press{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Jobs{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Partners{" "}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Company{" "}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {" "}
              About{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Blog{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Press{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Jobs{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Partners{" "}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Company{" "}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {" "}
              About{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Blog{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Press{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Jobs{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Partners{" "}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            {" "}
            Company{" "}
          </Typography>
          <div>
            <Button className="pb-5" variant="h6">
              {" "}
              About{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Blog{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Press{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Jobs{" "}
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              {" "}
              Partners{" "}
            </Button>
          </div>
        </Grid>
        <Grid className="p-20" item xs={12}>
            <Typography>
                &copy; 2023 ABDELAKDER. All rights reserved
            </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
