import { Grid, Grow } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const [counter, setCounter] = useState(0);
  const [product, setProduct] = useState(order?.orderItems[0]);
  const navigate = useNavigate();
  // date de livrason :
  const currentDate = new Date(order?.createdAt);
  currentDate.setDate(currentDate.getDate() + 3);
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const day = currentDate.getDate();
  const formattedDate = `${monthName} ${day}`;
  // end date

  // dial delivred
  // date de livrason :
  const currentDate2 = new Date(order?.shippedDate);
  currentDate2.setDate(currentDate2.getDate());
  const monthName2 = currentDate2.toLocaleString("en-US", { month: "long" });
  const day2 = currentDate2.getDate();
  const formattedDate2 = `${monthName2} ${day2}`;
  // end date

  // // mar3rftx 3lax drtha
  // useEffect(() => {
  //   setInterval(() => {
  //     if (counter < order?.orderItems?.length) {
  //       setCounter(counter + 1);
  //       return setProduct(order?.orderItems[counter]);
  //     } else {
  //       setCounter(0);
  //       return setProduct(order?.orderItems[0]);
  //     }
  //   }, 10000);
  // }, [counter]);

  return (
    <Grow in={true} timeout={1000}>
      <div
        className="p-5 shadow-md hover:shadow-2xl border h-[100%]"
        onClick={() => navigate(`/account/order/${order?._id.toString()}`)}
      >
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} md={8} >
            <div className="flex cursor-pointer">
              <div className="ml-2">
                <p className=" text-blue-500 text-md font-bold">
                  Order Detais :
                </p>
                <p className="opacity-50 text-s font-semibold">products :</p>
                {order?.orderItems.map((p, i) => (
                  <p className="opacity-70 font-semibold text-xs" key={i}>
                    {p.product.title} : {p.size} (color:{p.color}quantity:
                    {p.quantity})
                  </p>
                ))}
              </div>
            </div>
            <div className="flex cursor-pointer">
              <div className="ml-2">
                <p className=" text-sm font-bold">
                  Order date :{new Date(order?.createdAt.toString()).toLocaleDateString()}
                </p>
                <p className=" text-sm font-bold">
                  Total Price : {order?.totalPrice}
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={4} className="m-auto">
            {order?.orderStatus == "DELIVERED" ? (
              <>
                <p>
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="text-green-600 mr-2 text-xs text-center"
                  />
                  <span className="text-green-600 text-xs text-center">
                    Delivered On {formattedDate2}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-sm opacity-50 text-gray-500 font-semibold">
                    Your Item has been delivered
                  </span>
                </p>
              </>
            ) : (
              <div>
                {order?.orderStatus != "CANCELLED" ? (
                  <>
                    <p>
                      <span className="text-xs">
                        Expected Delivery On{formattedDate}
                      </span>
                    </p>
                    {order?.shippingState == "Paid" && (
                      <p className="text-sm">
                        <span className="text-sm opacity-50 text-gray-500 font-semibold">
                          Your Order has Been Paid
                        </span>
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex  text-red-500 text-center">
                    <WarningAmberIcon />
                    <p>this order Is cancelled</p>
                  </div>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </Grow>
  );
};

export default OrderCard;
