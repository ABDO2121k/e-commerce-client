
import ReactDOM from "react-dom/client";
import "./index.css";
// import ThemeProvider from "./themeProvider/Theme.jsx";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext";
import {Toaster} from 'react-hot-toast'
import {ToastContainer} from 'react-toastify'

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <BrowserRouter>
        {/* <ThemeProvider> */}
        <ToastContainer />
        <Toaster position='top-right'/>
          <App />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </AuthProvider>
);
