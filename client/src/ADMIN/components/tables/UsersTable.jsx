import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ChatModal from "../modals/ChatModal";

const UsersTable = () => {
  const auth = useContext(authContext);
  const [users, setUsers] = useState();
  const [rows, setRows] = useState([]);
  const [selectedUser,setSelectedUser]=useState()
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await auth?.GetAllUsers();
        setUsers(res);
      } catch (err) {
        console.log(err);
        return toast(err);
      }
    };
    fetchData();
  }, [auth?.isLo]);

  useEffect(() => {
    if (users?.length > 0) {
      setRows(
        users.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date(user.createdAt),
          chatReads: user.ChatReads,
          chat :user
        }))
      );
    }
  }, [users]);

 //rows
 const columns = [
    { field: "id", headerName: "User Id",  width: 200 },
    { field: "firstName", headerName: "FirstName",  width: 200 },
    { field: "lastName", headerName: "LastName",  width: 200 },
    { field: "email", headerName: "User Email",  width: 200 },
    { field: "createdAt", headerName: "Account Creation",  width: 200,type:'Date' },
    { field: "chatReads", headerName: "You Read his Chat ?",  width: 200,type:'boolean' },
    {
        field: "chat",
        headerName: "Chat",
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <Button onClick={()=>{
              setSelectedUser(params.value)
              handleOpen()
            }}>Get Chat</Button>
          </>
        ),
      }
 ]

//end erows


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
      <ChatModal open={open} handleClose={handleClose} user={selectedUser}/>
    </div>
  );
};

export default UsersTable;
