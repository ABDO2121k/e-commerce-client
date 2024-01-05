import { Box, Grid, Rating, Avatar } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
const ProductReviewCard = ({ review,handleCounter }) => {
  const auth=useContext(authContext)
  // date chtGPT
  const originalDate = new Date(review?.createdAt);
  // Define options for formatting the date
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Format the date to "November 30, 2023"
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  //END DATE

   const handleRemove=async()=>{
    if(! auth?.isLo) return toast.warning("you should login before delete a Review")
       try{
       await auth?.RemoveRating(review?._id.toString())
        toast.success("Review deleted with success")
        return setTimeout(()=>{
          handleCounter()
        },1500)
       }catch(err){
        console.log(err)
        return toast.error(err.message)
    }
   }
  
  return (
    <div className="flex justify-between">
    <div>
      <Grid container spacing={2} gap={5}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              {" "}
              {`${review?.user?.firstName[0]}${review?.user?.lastName[0]}`}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <p className="font-semibold text-lg">{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
            <p className="opacity-70">{formattedDate}</p>
          </div>
          <Rating
            value={review?.rating}
            precision={0.5}
            name="half-rating"
            readOnly
          />
          <p className="">{review?.review}</p>
        </Grid>
      </Grid>
    </div>
    {auth?.currentUser?._id==review?.user?._id&&<div className='text-red-500 cursor-pointer' onClick={handleRemove}>
      <DeleteForeverIcon/>
    </div>
    }
    </div>
  );
};

export default ProductReviewCard;
