import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Paypal = () => {
  const navigate = useNavigate();
  const initialOptions = {
    "client-id": import.meta.env.VITE_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const decodedQuery = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQuery);
  const [orderId, setOrderId] = useState();
  useEffect(() => {
    const ID = searchParams.get("order_id");
    setOrderId(ID);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center shadow-md h-[10rem]">
        <Button
          sx={{
            backgroundColor: "red",
            color: "black",
            fontSize: "1.2rem",
            fontWeight: "bolder",
          }}
          className="h-[30%] w-[20%]"
          onClick={() => navigate(`/checkout/?step=4&order_id=${orderId}`)}
        >
          COD
        </Button>
      </div>
      <div className="divider">OR</div>
      <div className={`w-[100%] shadow-md mt-4 flex flex-col items-center `}>
        <PayPalScriptProvider
          options={initialOptions}
        >
          <Checkout />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Paypal;
