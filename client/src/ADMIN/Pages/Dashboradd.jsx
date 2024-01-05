import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { toast } from "react-toastify";
import TableTest from "../components/tables/TbaleTest";
import ProductsTable from "../components/tables/ProductsTable";

const Dashboard = () => {
  const auth = useContext(authContext);
  const [lastProducts, setLastProducts] = useState([]);
  const [lastOut, setLastOut] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { pageNumber: 0, pageSize: 5 };
        const data2 = { stock: "out_of_stock" };
        const res = await auth?.findProducts(data);
        const res2 = await auth?.findProducts(data2);
        setLastProducts(res.products.content);
        setLastOut(res2.products.content);
      } catch (err) {
        console.log(err);
        return toast.error("an error while getting data !!!");
      }
    };
    fetchData();
  }, [auth?.isLo, counter]);

  const handlecounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}  className="shadow-sm">
          <h2 className="text-red-500 font-bold text-2xl text-center py-10">
            Last 5 orders :
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Grid item xs={12} md={8} className="w-full overflow-auto">
              <TableTest pageNumber={0} pageSize={5} />
            </Grid>
          </div>
        </Grid>
        <Grid items xs={12} md={6} className="shadow-sm p-5">
          <h2 className="text-red-500 font-bold text-2xl text-center py-10">
            Last 5 Products :
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Grid item xs={12}  className="w-full overflow-auto">
              <ProductsTable
                products={lastProducts}
                handleCounter={handlecounter}
              />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="shadow-sm  p-5">
          <h2 className="text-red-500 font-bold text-2xl text-center py-10">
            Product Out Of Stock :
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Grid item xs={12} className="w-full overflow-auto">
              <ProductsTable products={lastOut} handleCounter={handlecounter} />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
