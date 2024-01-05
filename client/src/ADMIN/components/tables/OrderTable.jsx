import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import OrderItem from '../tableItem/OrderItem'
import { useLocation } from "react-router-dom";


const OrderTable = ({pageSize,pageNumberChange}) => {
  const [lastOrders, setLastOrders] = useState();
  const [counter, setCounter] = useState(0);
  const auth = useContext(authContext);
  const location=useLocation()

  useEffect(() => {
    const decodedQuery = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQuery);
    const pageNumber=searchParams.get("page")
    const fetchData = async () => {
      try {
        const order = await auth?.getAllOrder(pageNumber,pageSize);
        setLastOrders(order);
        pageNumberChange(order.pageNumber)
      } catch (err) {
        console.log(err);
        return toast.error("an error while getting data !!!");
      }
    };
    fetchData();
  }, [auth?.isLo, counter,location]);



  const handlecounter = () => {
    setCounter(counter + 1);
  };
  return (
    <TableContainer>
      <Table className="border shadow-md mt-7 w-full">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell>User </TableCell>
            <TableCell>Prix Total </TableCell>
            <TableCell>Order Date </TableCell>
            <TableCell>Status </TableCell>
            <TableCell>
              {" "}
              <VisibilityIcon />{" "}
            </TableCell>
            <TableCell>
              <EditIcon className="text-red-500" />{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastOrders?.orders?.map((e, i) => (
            <OrderItem key={i} exemple={e} counterF={handlecounter} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
