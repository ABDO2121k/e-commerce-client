import { Button, Grid } from "@mui/material";
import ProductsTable from "../components/tables/ProductsTable";
import AddProduct from "../components/modals/AddProductModal";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { toast } from "react-toastify";

const Products = () => {
  const auth = useContext(authContext);
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [counter,setCounter]=useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {};
        const res = await auth?.findProducts(data);
        setProducts(res.products.content);
      } catch (err) {
        console.log(err);
        return toast(err);
      }
    };
    fetchData();
  }, [auth?.isLo,counter]);

  const handleCounter=()=>setCounter((prev)=>prev+1)

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div className="flex items-center justify-between py-10">
            <h4 className="font-bold text-[2rem] text-red-400"> Products : </h4>
            <Button variant="contained" onClick={handleOpen}>
              {" "}
              Create new Product
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <ProductsTable products={products}   handleCounter={handleCounter}/>
        </Grid>
      </Grid>
      <AddProduct
        open={open}
        handleClose={handleClose}
        handleCounter={handleCounter}
      />
    </div>
  );
};

export default Products;
