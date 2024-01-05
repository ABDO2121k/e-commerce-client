import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import OderDetailsModel from "../modals/OderDetailsModel";
import { Link } from "react-router-dom";
import OrderStatus from "../tableItem/OrderStatus";

export default function TableTest({pageNumber,pageSize}) {
  const auth = useContext(authContext);
  const [orders, setOrders] = useState();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [selectedOrder,setSeletedOrder]=useState()
  const [counter, setCounter] = useState(0);



  const handlecounter = () => {
    setCounter(counter + 1);
  };

  //columns
  const columns = [
    { field: "id", headerName: "Order Id", headerAlign: "center", width: 200 },
    {
      field: "user",
      headerName: "User fullName",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      headerAlign: "center",
      width: 100,
      type: "date",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 100,
      type: "number",
    },
    {
      field: "totalItem",
      headerName: "Total Items",
      headerAlign: "center",
      width: 80,
      type: "number",
    },
    {
      field: "products",
      headerName: "Products",
      headerAlign: "center",
      width: 300,
      renderCell: (params) => (
        <div
          className={`flex items-center ${
            params.value.length > 1 ? "justify-around" : "justify-center"
          } w-full`}
        >
          {params.value.map((product, index) => (
            <div key={index} className="flex flex-col py-5">
              <Avatar
                src={product.images}
                sx={{ width: 24, height: 24, margin: "auto" }}
              />
              <h2 className="text-xs">
                Size: {product.size}, Quantity: {product.quantity}
              </h2>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "user phone",
      width: 150,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,
    },
    {
      field: "shippingState",
      headerName: "paiment Status",
      width: 200,
    },
    {
      field: "paidDate",
      headerName: "Paid Date",
      width: 100,
      type: "date",
    },
    {
      field: "shippedDate",
      headerName: "Shipped Date",
      width: 100,
      type: "date",
    },
    {
      field: "details",
      headerName: "Details",
      width: 100,
      renderCell: (params) => (
        <>
          <Link onClick={()=>{
            setSeletedOrder(params.value)
            handleOpen()
          }}>details</Link>
        </>
      ),
    },
    {
      field: "status",
      headerName: "Order Status",
      width: 100,
      renderCell: (params) => (
        <>
         <OrderStatus exemple={params.value} counterF={handlecounter}/>
        </>
      ),
    },
  ];

  // salina columns

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const order = await auth?.getAllOrder(pageNumber,pageSize);
        setOrders(order.orders)
      } catch (err) {
        console.log(err);
        window.alert(err.message);
        return toast.error("an error while getting data !!!");
      }
    };
    fetchData();
  }, [auth?.isLo,counter]);


  useEffect(() => {
    if (orders?.length > 0) {
      setRows(
        orders.map((order) => ({
          id: `${order._id}`,
          totalPrice: order.totalPrice,
          user: `${order?.user?.firstName} ${order?.user?.lastName}`,
          products: order.orderItems.map((item) => ({
            images: item.product.imageUrl[0],
            size: item.size,
            quantity: item.quantity,
          })),
          paidDate: order.PaidDate
            ? new Date(
                order.PaidDate?.toString().replace("T", " ").replace("Z", "")
              )
            : null,
          shippedDate: order.shippedDate
            ? new Date(order.shippedDate?.toString())
            : null,
          orderDate: new Date(
            order.createdAt?.toString().replace("T", " ").replace("Z", "")
          ),
          totalItem: order.totalItem,
          orderStatus: order.orderStatus,
          shippingState: order.shippingState,
          // shippingAddress: `address : ${order.shippingAddress.adress}  city : ${order.shippingAddress.city}`,
          phone: order.shippingAddress.phone,
          details: order,
          status:order
        }))
      );
    }
  }, [orders]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[2, 5, 10]}
      />
       <OderDetailsModel
            open={open}
            order={selectedOrder}
            handleClose={handleClose}
          />
    </div>
  );
}
