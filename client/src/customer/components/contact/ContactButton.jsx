import { useContext, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ContactDetails from "./ContactDetails";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Button, Collapse } from "@mui/material";
import { authContext } from "../../../context/authContext";

const ContactButton = () => {
  const [open, setOpen] = useState(false);
  const auth=useContext(authContext)
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* SpeedDial positioned independently */}
      <SpeedDial
        sx={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          bottom: "10px",
        }}
        ariaLabel="SpeedDial"
        open={open}
        direction="up"
        icon={<SupportAgentIcon onClick={handleToggle} />}
      >
        <Collapse in={open}>
          {open &&(auth?.isLo? (
            <ContactDetails />
          ) : (
            <Button sx={{ fontWeight: "bold",backgroundColor:'white' }}>
              You should Login to contact the support
            </Button>
          ))}
        </Collapse>
      </SpeedDial>
    </>
  );
};

export default ContactButton;
