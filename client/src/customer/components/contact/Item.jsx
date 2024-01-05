import { useContext } from "react";
import { authContext } from "../../../context/authContext";


const Message = ({ role, message }) => {
  const auth=useContext(authContext)
  return (
<div className={`chat ${role ==auth?.currentUser?.role ? 'chat-end':'chat-start'}`}>
  <div className={`chat-bubble ${role !=auth?.currentUser?.role ?'chat-bubble-info':''}`}>{message}</div>
</div>
  );
};

export default Message;
