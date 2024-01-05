import { Button } from "@mui/material";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { toast as toast2 } from "react-toastify";
import { authContext } from "../../../context/authContext";

const Cart = () => {
  const [counter, setCounter] = useState(0);
  const auth = useContext(authContext);
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const handleCheckOut = () => {
    if (!auth?.isLo) return toast2.warning("You can't checkout without login");
    if (products?.totalDiscountedPrice <= 0 || !products) {
      return toast2.warning(
        "You can't checkout without any product in the cart"
      );
    }
    navigate("/checkout?step=2");
  };

  const handleChildFunctionCall = () => {
    setCounter(counter + 1);
    console.log("Child function called. useEffect will be triggered!");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        toast.loading("getting products", { id: "products" });
        const res = await auth?.getCartItems();
        toast.success("products are loaded", { id: "products" });
        return await setProducts(res);
      } catch (err) {
        console.log("error: ", err);
        return toast.error(`failed to get data`, { id: "products" });
      }
    };

    const getDataLocal = async () => {
      const local = localStorage.getItem("items");
      if (local) {
        const localData = JSON.parse(local);
        let cartItems = [];
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;
        for (let item of localData) {
          let product = await auth?.findProductById(item.productId);
          totalPrice += product.price;
          totalDiscountedPrice += product.discountPrice;
          totalItem += 1;
          cartItems.push({ product: product, size: item.size, quantity: 1 });
        }
        setProducts({
          cartItems,
          totalPrice: totalPrice,
          totalDiscountedPrice: totalDiscountedPrice,
          totalItem: totalItem,
        });
      }
    };
    if (auth?.isLo) {
      getData();
    } else {
      getDataLocal();
    }
  }, [counter, auth]);
  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {products?.cartItems?.length > 0 ? (
            products?.cartItems.map((e, i) => (
              <CartItem
                key={i}
                product={e}
                onChildFunctionCall={handleChildFunctionCall}
                Modifier={true}
              />
            ))
          ) : (
            <h1> No product In th Cart</h1>
          )}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>{products?.totalDiscountedPrice}DH</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span className="text-green-700">
                  {parseInt(products?.totalPrice) -
                    parseInt(products?.totalDiscountedPrice)}
                  DH
                </span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Delivery Charge</span>
                <span className="text-green-700">Free</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Total Amount</span>
                <span className="text-green-700">{products?.totalPrice}DH</span>
              </div>
            </div>
            <Button
              onClick={handleCheckOut}
              variant="contained"
              className="mt-5 w-full"
              sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
