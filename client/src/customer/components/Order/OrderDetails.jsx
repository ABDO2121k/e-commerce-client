import { Box, Button, Grid } from "@mui/material";
import AdressCard from "../AdressCard/AdressCard";
import OrderTraker from "./OrderTraker";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const OrderDetails = ({ orderId }) => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [step, setStep] = useState(1);
  const auth = useContext(authContext);
  const navigate = useNavigate();



  const handelCancel = async () => {
    if (step >= 2)
      return toast.warning("you can't cancel order that is already shipped");

    try {
      await auth?.CancelOrder(params.orderId);
      return toast.success("order cancelled");
    } catch (err) {
      console.log(err);
      toast.err(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await auth?.getOrderById(params.orderId || orderId);
        switch (res?.orderStatus) {
          case "PLACED":
            setStep(1);
            break;
          case "CONFIRMED":
            setStep(2);
            break;
          case "SHIPPED":
            setStep(3);
            break;
          case "DELIVERED":
            setStep(4);
            break;
          default:
            setStep(1);
        }
        return setOrder(res);
      } catch (err) {
        toast.error(
          `error : You are not authenticated or this order not your's`
        );
        return setInterval(() => {
          navigate(-1);
        }, 2500);
      }
    };
    fetchData();
  }, [params.orderId]);

  const handelDelete = async () => {
    if(order?.orderStatus!=="CANCELLED")  return toast.warning("you can't delete order that is not cancelled");
     

    try {
      await auth?.deleteOrder(params.orderId);
      toast.success("order deleted");
      setTimeout(() => {
        navigate(-1);
      }, 300);
    } catch (err) {
      console.log(err);
      toast.err(err.message);
    }
  };
  return (
    <div className="px-5 lg:px-20 py-5">
      <div className="flex items-center mt-2">
        <div className="flex-1 shadow-md flex flex-col items-center">
          <h1 className="font-bold text-xl py-2 text-purple-500">
            Delivery Address
          </h1>
          <AdressCard address={order?.shippingAddress} />
        </div>
        <div className="flex flex-col items-center justify-between py-10 ml-4 shadow-lg flex-1">
          {order?.orderStatus != "CANCELLED" ? (
            <>
              <h1 className="text-lg font-bold align-center text-purple-600">
                {" "}
                cancel Order
              </h1>
              <Button
                sx={{ color: "red", paddingY: "10px" }}
                onClick={handelCancel}
              >
                {" "}
                Cancel Order{" "}
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-between text-red-500">
                <WarningAmberIcon />
                <p>this order Is cancelled</p>
              </div>
              <Button
                sx={{
                  color: "red",
                  border: "1px solid black",
                  marginTop: "10px",
                }}
                onClick={handelDelete}
              >
                Remove this Order
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="py-20">
        <OrderTraker activeStep={step} />
      </div>
      <Grid container className="space-y-5">
        {order?.orderItems.map((item, i) => (
          <Grid
            key={i}
            item
            container
            className="shadow-xl rounded-md p-5 border cursor-pointer"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            onClick={() => navigate(`/product/${item.product._id}`)}
          >
            <Grid item sx={2}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[8rem] h-[8rem] object-cover object-top"
                  src={item.product.imageUrl[0]}
                  alt=""
                />
              </div>
            </Grid>
            <Grid item sx={6}>
            <div className="space-y-2 ml-10 ">
                  <p className="text-lg font-bold">{item.product.title}.</p>
                  <p className="space-x-5 opacity-50 text-sm font-semibold">
                    <span>Color:{item.product.color}</span>
                    <span> size:{item.size}</span>
                  </p>
                  <p> quantity :  {item.quantity}</p>
                  <p>Mark : {item.product.brand}</p>
                  <p>Price: {item.product.price}DH</p>
                </div>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ color: deepPurple[500], cursor: "pointer" }}>
                <StarBorderIcon
                  sx={{ fontSize: "2rem" }}
                  className="px-2 text-5xl"
                />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
