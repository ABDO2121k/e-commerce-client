import { Box, Grid, Modal, Typography } from "@mui/material";
import AdressCard from "../../../customer/components/AdressCard/AdressCard";
import OrderCard from '../../../customer/components/Order/OrderCard'

const OderDetailsModel = ({ open, order, handleClose }) => {
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
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12} sm={6} className="shadow-md p-5 " sx={{height:'80%'}}>
              <h2 className="font-semibold text-lg text-blue-400">
                shipping address :
              </h2>
              <AdressCard address={order?.shippingAddress} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OrderCard  order={order} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default OderDetailsModel;
