import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const auth = useContext(authContext);
  const [order,setOrder]=useState()
  const [orderId,setOrderId]=useState()
  const decodedQuery = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQuery);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };
  const onCreateOrder = (data, actions) => {
    if(order?.totalPrice){
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${order?.totalPrice.toString()}`,
          },
        },
      ],
    });
  }else{
    toast.error("error please try again")
  }
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      handlePaid();
      const name = details.payer.name.given_name;
      toast(`Transaction completed by ${name}`);
    });
  };
  useEffect(() => {
    const getOrder=async()=>{
      try {
        const ID = searchParams.get("order_id");
        setOrderId(ID)
      const or=  await auth?.getOrderById(ID)
      setOrder(or)
    } catch (err) {
      console.log(err.message);
    }
    }
    getOrder()
  }, []);

  const handlePaid = async () => {
    try {
        await auth?.PaidOrder(orderId)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
        {console.log(order?.totalPrice)}
          <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">💵 USD</option>
            <option value="EUR">💶 Euro</option>
          </select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
