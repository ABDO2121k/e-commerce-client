import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { findProductById, findProducts } from "./product.js";
import {
  getCartItems,
  addItemToCart,
  removeCartItem,
  updateCartItem,
} from "./cart.js";
import {
  createOrder,
  getOrderById,
  getOrderHistory,
  PaidOrder,
} from "./order.js";
import {getAllOrder,confirmOrder,shipOrder,deliverOrder,CancelOrder,deleteOrder} from './adminOrder.js'
import { AddReview, Review, RemoveRating } from "./Review.js";
import {GetAllUsers} from './adminUser.js'
import {CreateProduct,UpdateProduct} from './adminProducts'
import {setNews,getNews,setCatSettings,getCatSettings,getCatSettingsData} from './adminSettigs'



export const authContext = createContext(null);

axios.defaults.baseURL = "https://Ecommerce-api.onrender.com/";
axios.defaults.withCredentials = true;


const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLo, setLogged] = useState(false);

  const login = async (inputs) => {
    const res = await axios.post("/auth/signin", inputs);
    setCurrentUser(res.data);
    setLogged(true);
    const local = localStorage.getItem("items");
    if (local) {
      let localData = JSON.parse(local);
      for (let item of localData) {
        await addItemToCart(item);
      }
      return localStorage.removeItem("items");
    }
  };

  const signup = async (inputs) => {
    const res = await axios.post("/auth/signup", inputs);
    if (!res) {
      throw new Error("Unable to register");
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    setLogged(false);
  };

  const BahaWjdha = async (name) => {
    const data = { name: name };
    try {
      const res = await axios.post("/api/products/category", data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
        const res = await axios.post("/api/users/profile");
        const res2 = await axios.get("/api/cart/");
        if (res.status !== 200 || res2.status !== 200) {
          throw new Error("Unable to authenticate");
        }
        const data = await res.data;
        if (data) {
           setCurrentUser(res.data);
          setLogged(true);
        }
    };
    checkAuth();
  }, []);

  return (
    <authContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        findProducts,
        findProductById,
        isLo,
        addItemToCart,
        removeCartItem,
        getCartItems,
        createOrder,
        updateCartItem,
        getOrderById,
        getOrderHistory,
        CancelOrder,
        deleteOrder,
        BahaWjdha,
        AddReview,
        Review,
        RemoveRating,
        PaidOrder,
        getAllOrder,
        confirmOrder,
        shipOrder,
        deliverOrder,
        GetAllUsers,
        CreateProduct,
        UpdateProduct,
        setNews,
        getNews,
        getCatSettings,
        setCatSettings,
        getCatSettingsData

      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;




