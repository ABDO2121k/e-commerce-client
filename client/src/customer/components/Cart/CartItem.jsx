import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-hot-toast";
import { toast as toast2 } from "react-toastify";

const CartItem = ({ product, onChildFunctionCall, Modifier }) => {
  const auth = useContext(authContext);
  const [quantityMax, setQuantityMax] = useState();
  const removeCartItem = async (productId) => {
    try {
      toast.loading("removing product from cart", { id: "remove" });
      if (!auth?.isLo) {
        const local = localStorage.getItem("items");
        const localData = JSON.parse(local);
        const data = localData.filter((item) => item.id !== productId);
        localStorage.setItem("items", JSON.stringify(data));
      } else {
        await auth?.removeCartItem(productId);
      }
      onChildFunctionCall();
      return toast.success("product removed with success", { id: "remove" });
    } catch (err) {
      console.log("error: ", err);
      return toast.error(`failed to remove Item please try again`, {
        id: "remove",
      });
    }
  };
  const handleUpdateCartItem = async (num) => {
     if(!auth?.isLo) return toast2.warning("You cant Update  the quantity without Login")
    const data = {
      cartItemId: product?._id.toString(),
      data: { quantity: product?.quantity + num },
    };
    if (data.data.quantity > quantityMax)
      return toast2.warning(`the quantity availabel is : ${quantityMax} `);
    try {
      await auth?.updateCartItem(data);
      return onChildFunctionCall();
    } catch (err) {
      console.log("error: ", err);
      return toast.error(`failed to get data`, { id: "products" });
    }
  };

  useEffect(() => {
    for (let size of product.product.sizes) {
      if (size.name == product.size) {
        setQuantityMax(size.quantity);
      }
    }
  }, [product]);

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={
              product?.product.imageUrl[1]
                ? product?.product.imageUrl[1]
                : product?.product.imageUrl
            }
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1 ">
          <p className="font-semibold">{product?.product.title}</p>
          <p className="opacity-70">
            Size:{product?.size},{product?.product.color}
          </p>
          <p className="opacity-70 mt-2">Seller :{product?.product.brand}</p>
          <div className=" flex space-x-5 items-center  text-gray-900">
            <p className="font-semibold">{product?.product.price}$</p>
            <p className="opacity-50 line-through">
              {" "}
              {product?.product.discountPrice}$
            </p>
            <p className="text-green-600 font-semibold">
              {" "}
              {product?.product.discountPercent}% off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items center lg:space-x-10 pt-4">
        <div className="flex items-center space-x2">
          {Modifier && (
            <IconButton
              sx={{ color: "rgb(145 85 253)" }}
              onClick={() => handleUpdateCartItem(-1)}
              disabled={product?.quantity <= 1}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          <span className="py-1 px-7 border rounded-sm">
            {product?.quantity}
          </span>
          {Modifier && (
            <IconButton
              sx={{ color: "rgb(145 85 253)" }}
              onClick={() => handleUpdateCartItem(1)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </div>
        <div>
          {Modifier && (
            <Button
              sx={{ color: "rgb(145 85 253)" }}
              onClick={() => removeCartItem(product?._id?.toString())}
            >
              remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
