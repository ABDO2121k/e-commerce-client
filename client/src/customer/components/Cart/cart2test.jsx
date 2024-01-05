import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast as toast2 } from "react-toastify";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/authContext";



export default function Cart2({open3,setOpen3}) {
  const auth = useContext(authContext);
  const [products2, setProducts] = useState();
  const navigate = useNavigate();
  const handleCheckOut = () => {
    if (!auth?.isLo) return toast2.warning("You can't checkout without login");
    if (products2?.totalDiscountedPrice <= 0 || !products2) {
      return toast2.warning(
        "You can't checkout without any product in the cart"
      );
    }
    navigate("/checkout?step=2");
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

    getData();
  }, []);

  return (
    <Transition.Root show={open3} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen3}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen3(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products2?.cartItems.map((product) => (
                              <li
                                key={product?.product._id}
                                className="flex py-6"
                              >
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product?.product.imageUrl}
                                    alt={"product img"}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a>{product?.product.title}</a>
                                      </h3>
                                      <p className="ml-4">
                                        {product?.product.price *
                                          product?.quantity}
                                        DH
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Color : {product?.product.color}
                                    </p>
                                  </div>
                                  <div className=" flex space-x-5 items-center  text-gray-900">
                                    <p className="font-semibold">
                                      {product?.product.price}$
                                    </p>
                                    <p className="opacity-50 line-through">
                                      {" "}
                                      {product?.product.discountPrice}$
                                    </p>
                                    <p className="text-green-600 font-semibold">
                                      {" "}
                                      {product?.product.discountPercent}% off
                                    </p>
                                  </div>
                                  <div className="flex  items-center justify-center text-sm mt-4  w-full">
                                    <div className="flex items-center justify-center">
                                      <IconButton
                                        sx={{ color: "rgb(145 85 253)" }}
                                      >
                                        <AddCircleOutlineIcon />
                                      </IconButton>
                                      <p className="text-gray-500">
                                        Qty {product?.quantity}
                                      </p>
                                      <IconButton
                                        sx={{ color: "rgb(145 85 253)" }}
                                      >
                                        <AddCircleOutlineIcon />
                                      </IconButton>
                                    </div>

                                    <div className="flex items-end">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-4 font-semibold"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex flex-col items-around ">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p className="text-purple-500 font-bold">Price</p>
                          <span>{products2?.totalDiscountedPrice}DH</span>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <span className="text-purple-500 font-bold">
                            Discount
                          </span>
                          <span className="text-green-700">
                            {parseInt(products2?.totalPrice) -
                              parseInt(products2?.totalDiscountedPrice)}
                            DH
                          </span>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <span className="text-purple-500 font-bold">
                            Delivery Charge
                          </span>
                          <span className="text-green-700">Free</span>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p className="text-purple-500 font-bold">Total</p>
                          <p>{products2?.totalPrice}DH</p>
                        </div>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          onClick={handleCheckOut}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
