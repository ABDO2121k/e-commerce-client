import { Box, Modal} from "@mui/material";
import Register from "./Register";
import Login from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthModel = ({ handleClose, open }) => {
    const location=useLocation()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    outline:'none',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {location.pathname==="/login"?<Login/>:<Register/> }
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
