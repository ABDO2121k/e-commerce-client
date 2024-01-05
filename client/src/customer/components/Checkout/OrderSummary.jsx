import { Button } from "@mui/material";
import AdressCard from "../AdressCard/AdressCard";
import CartItem from "../Cart/CartItem";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const auth = useContext(authContext);
  const [products, setProducts] = useState();
  const location=useLocation()
  const searchParams=new URLSearchParams(location.search)
  const orderId=searchParams.get("order_id")
  const navigate=useNavigate()


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await auth?.getOrderById(orderId);
        toast.success("products are loaded", { id: "products" });
        return await setProducts(res);
      } catch (err) {
        console.log("error: ", err);
        return toast.error(`failed to get data`, { id: "products" });
      }
    };

    getData();
  }, [orderId]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AdressCard address={products?.shippingAddress}/>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="col-span-2">
            {products?.orderItems.length > 0 ? (
              products?.orderItems.map((e, i) => (
                <CartItem
                  key={i}
                  product={e}
                  Modifier={false}
                />
              ))
            ) : (
              <h1> No product In th Cart</h1>
            )}
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price details
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>{products?.totalPrice}DH</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Discount</span>
                  <span className="text-green-700">-{parseInt(products?.totalPrice)-parseInt(products?.totalDiscountPrice)}DH</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Delivery Charge</span>
                  <span className="text-green-700">Free</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Total Amount</span>
                  <span className="text-green-700">{products?.totalDiscountPrice}DH</span>
                </div>
              </div>
              <Button
                variant="contained"
                className="mt-5 w-full"
                sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
                onClick={() => navigate("/account/order")}
              >
                SUCCESS 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
