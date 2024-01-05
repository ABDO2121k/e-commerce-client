import { Route, Routes } from "react-router-dom";
import Admin from "./ADMIN/Pages/Admin";
import { useContext } from "react";
import { authContext } from "./context/authContext";
import CustomerRoute from "./customer/Routers/CustomerRoute";


const App = () => {
  const auth=useContext(authContext)
  return (
    <div className="">
    <Routes>
      <Route path="/*" element={<CustomerRoute />} />
      {auth?.currentUser?.role?.toLowerCase()=="admin"&&<Route path="/admin/*" element={<Admin/>}/>}
    </Routes>
  </div>
  );
};

export default App;
