import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import OderDetailsModel from "../modals/OderDetailsModel";
import { useContext, useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { authContext } from "../../../context/authContext";

const OrderItem = ({ exemple, counterF }) => {
  const auth = useContext(authContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const [order, setOrder] = useState();
  useEffect(() => {
    setOrder(exemple);
  }, [exemple]);

  const confirm = async () => {
    try {
      if (order?.orderStatus == "CONFIRMED")
        return toast.warning("already confirmed !!!!");
      if (order?.orderStatus == "CANCELLED")
        return toast.warning("You can't confirm an order already  cancelled");
      if (order?.orderStatus !== "PLACED")
        return toast.warning(
          "You can't confirm an order already  shipped or delivered"
        );

      const res = await auth?.confirmOrder(order?._id);
      toast.success(res);
      return counterF();
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };
  const ship = async () => {
    try {
      if (order?.orderStatus == "SHIPPED")
        return toast.warning("already shipped !!!!");
      if (order?.orderStatus !== "CONFIRMED")
        return toast.warning("You can't ship an order not  confirmed");

      const res = await auth?.shipOrder(order?._id);
      toast.success(res);
      return counterF();
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  const deliver = async () => {
    try {
      if (order?.orderStatus == "DELIVERED")
        return toast.warning("already delivered !!!!");
      if (order?.orderStatus !== "SHIPPED")
        return toast.warning("You can't deliver an order not  shipped");
      const res = await auth?.deliverOrder(order?._id);
      toast.success(res);
      return counterF();
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  const cancel = async () => {
    try {
      if (order?.orderStatus == "CANCELLED")
        return toast.warning("already cancelled !!!!");
      if (
        order?.orderStatus == "CONFIRMED" ||
        order?.orderStatus == "DELIVERED" ||
        order?.orderStatus == "SHIPPED"
      )
        return toast.warning(
          "You can't cancel an order already confirmed or shipped"
        );
      const res = await auth?.CancelOrder(order?._id);
      toast.success(res);
      return counterF();
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  const deleteO = async () => {
    try {
      if (order?.orderStatus !== "CANCELLED")
        return toast.warning("you can't delete an order not cancelled!!!!");
      const res = await auth?.deleteOrder(order?._id);
      toast.success(res);
      return counterF();
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  return (
    <TableRow
      key={order?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        {order?.orderItems?.map((p, i) => (
          <>
            <Avatar
              key={i}
              alt="productImg"
              src={p?.product?.imageUrl}
              sx={{ width: 24, height: 24 }}
            />
          </>
        ))}
      </TableCell>
      <TableCell>
        {order?.user?.firstName} {order?.user?.lastName}
      </TableCell>
      <TableCell>{order?.totalPrice}</TableCell>
      <TableCell>
        {order?.oderDate.toString().replace("T", " ").replace("Z", "")}
      </TableCell>
      <TableCell>{order?.orderStatus}</TableCell>
      <TableCell>
        <Link onClick={handleOpen}>details</Link>
        <OderDetailsModel open={open} order={order} handleClose={handleClose} />
      </TableCell>
      <TableCell>
        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Status
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open2}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={confirm}>Confirm Order</MenuItem>
            <MenuItem onClick={ship}>Ship Order</MenuItem>
            <MenuItem onClick={deliver}>Deliver Order</MenuItem>
            <MenuItem onClick={cancel}>Cancel Order</MenuItem>
            <MenuItem onClick={deleteO}>
              Delete Order <DeleteIcon className="text-red-500" />
            </MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
