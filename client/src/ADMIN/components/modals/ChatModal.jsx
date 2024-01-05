import { Box, Modal } from "@mui/material";
import ContactDetails from "../../../customer/components/contact/ContactDetails";

const ChatModal = ({ open, user, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
    {console.log(user)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ContactDetails userId={user?._id}/>
        </Box>
      </Modal>
    </div>
  );
};

export default ChatModal;
