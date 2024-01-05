import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../components/Cart/Cart";
import Nav from "../components/navigation/Nav";
import Footer from "../components/Footer/Footer";
import Product from "../components/Product/Product";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Checkout from "../components/Checkout/Checkout";
import Order from "../components/Order/Order";
import OrderDetails from "../components/Order/OrderDetails";
import ContactButton from "../components/contact/ContactButton";

const CustomerRoute = () => {
  return (
    <div>
      <ContactButton />
      <div>
        <Nav />
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Home />} />
        <Route path="register" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path=":lvlone/:lvltwo/:lvlthree" element={<Product />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account/order" element={<Order />} />
        <Route path="account/order/:orderId" element={<OrderDetails />} />
        </Routes>
      <div>
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoute;
