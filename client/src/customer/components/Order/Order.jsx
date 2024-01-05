import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";

const Order = () => {
  const auth = useContext(authContext);
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await auth?.getOrderHistory();
        toast.success("products are loaded", { id: "products" });
        return await setOrders(res);
      } catch (err) {
        console.log("error: ", err);
        return toast.error(`failed to get data`, { id: "products" });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {orders?.length > 0 ? (
        <div className="px-5 lg:px-20 ">
          <Grid
            container
            sx={{ justifyContent: "space-between", marginTop: "20px" }}
          >
            <Grid item xs={12}>
              <div className="space-y-5">
                {orders?.map((e, i) => (
                  <OrderCard key={i} order={e} />
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="p-20 flex flex-col items-center w-full border">
          {" "}
          <h1 className="text-[2rem] text-red-400"> No order Found !!!!!!</h1>
        </div>
      )}
    </>
  );
};

export default Order;
