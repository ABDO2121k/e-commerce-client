import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Rating,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../../context/authContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Review = ({ handleClose, open, product,handleCounter }) => {
   const [alert,setAlert]=useState({type:"info",message:"Please give us you Review"})
  const [seledImg, setSelectedImg] = useState(product?.imageUrl[0]);
  const [ratingValue, setRatingValue] = useState(2.5);
  const params=useParams()
  const auth=useContext(authContext)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const review = {
      review: data.get("review"),
      rating:ratingValue,
      productId:params.productId
    };
    e.target.reset()
    if(! auth?.isLo) return toast.warning("you should login before sen a Review")
    try{
       await auth?.AddReview(review)
       setAlert({type:"success",message:"Review Submitted Successfully"})
       setTimeout(()=>{
        setAlert({type:"info",message:"Please give us you Review"})
       },2000)
       return handleCounter()
    }catch(err){
        console.log(err)
        return setAlert({type:"error",message:err.message})
    }
  };

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Alert severity={alert.type}>{alert.message}</Alert>
          <Grid container xs={12} className="py-10 w-[50%] h-[50%] ">
            <Grid item xs={12} sm={6}>
              <div className="flex flex-col items-center mt-5">
                <div className="overflow-hidden rounded-lg max0w0[30rem] max-h-[20rem] flex-1">
                  {seledImg ? (
                    <img
                      src={seledImg}
                      alt={product?.title}
                      className="h-[10rem] w-[10rem] object-cover object-center"
                    />
                  ) : (
                    <img
                      src={product?.imageUrl}
                      alt={product?.title}
                      className="h-[10rem] w-[10rem] object-cover object-center"
                    />
                  )}
                </div>
                <div className="flex flex-wrap space-x-5 justify-center">
                  {product?.imageUrl?.map((e, i) => (
                    <div
                      className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                      key={i}
                    >
                      <img
                        src={e}
                        alt={i}
                        className="h-full w-full object-cover object-center"
                        onClick={() => setSelectedImg(e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className="py-5 w-[50%]  h-[50%] ">
              <form
                className="w-fullflex flex-col items-center"
                onSubmit={handleSubmit}
              >
                <TextField
                  required
                  id="review"
                  name="review"
                  label="Review"
                  fullWidth
                  autoComplete="given-name"
                  multiline
                  rows={3}
                />
                <div className="py-5 flex flex-col  justify-around w-full">
                  <label>YOUR RATING:</label>
                  <Rating
                    sx={{ margin: "auto" }}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    id="rating"
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                  />
                </div>
                <Button
                  sx={{ bgcolor: "rgb(145 85 253)", marginBottom: "2rem" }}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Review;
