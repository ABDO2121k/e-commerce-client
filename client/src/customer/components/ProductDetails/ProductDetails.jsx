import { useContext, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Rating,
} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSection/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Review from "./REVIEW/Review";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [open, setOpen] = useState(false);
  const [lafammille, setFammile] = useState();
  const [product2, setProduct] = useState();
  const auth = useContext(authContext);
  const [selectedSize, setSelectedSize] = useState();
  const [seledImg, setSelectedImg] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviews, setReviews] = useState();
  const [counter, setCounter] = useState(0);
  const [reviewAvg,setReviewAvg]=useState(5)

  const handleAddToCart = async () => {
    if (!selectedSize) {
      return toast.warning(
        "you should choose a size if there is no size availabel please search for another product !!",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    try {
      const productId = params.productId;
      const data = { productId: productId, size: selectedSize };
      if (!auth?.isLo) {
        const local=localStorage.getItem("items")
        let items;
        if(local){
          const localData=JSON.parse(local)
          const exists=localData.find((item)=>item.productId==data.productId&&item.size==data.size)
          console.log("exists",exists)
          if(exists)  throw new Error("Item with this size already exists to cart")
          items=[...localData,data]
        }else{
          items=[data]
        }
        const localItems=JSON.stringify(items)
        navigate("/cart");
       return localStorage.setItem("items",localItems)
      }
     const res= await auth?.addItemToCart(data);
     if(!res) throw new  Error("Item with this size already exists to cart")
      navigate("/cart");
    } catch (err) {
      return toast.warning(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const productId = params.productId;
    setOpen(true);
    const loadProduct = async () => {
      try {
        const res = await auth?.findProductById(productId);
        const res2 = await auth?.Review(productId);
        await setProduct(res);
        await setReviews(res2);
        product2?.imageUrl?.length > 1
          ? setSelectedImg(product2?.imageUrl[0])
          : setSelectedImg(product2?.imageUrl);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    loadProduct();
  }, [params, counter]);

  useEffect(() => {
    const getAllProducts = async () => {
      await axios
        .get(`api/products/?category=${product2?.category?.name}&pageSize=10&pageNumber=0&stock=in_stock`)
        .then((res) => setData(res.data.content));
      const res = await auth?.BahaWjdha(product2?.category?.name);
      setFammile(res.categories);
    };
    getAllProducts();
    setTimeout(() => {
      setOpen(false);
      setReviewAvg(reviews?.info?.motawassit)
    }, 3000);
  }, [product2]);

  //review form

  const handleClose = () => {
    setOpenReviewModal(false);
  };
  // end review

  // hadi drtha bax ila 5dm xi child y zid f conteur bax ydir rende:
  const handleCounter = () => {
    setCounter(counter + 1);
    setTimeout(()=>{
      setOpenReviewModal(false)
    },1000)
  };
  return (
    <div className="bg-white lg:px-10">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {lafammille?.map((breadcrumb) => (
              <li key={breadcrumb.name}>
                <div className="flex items-center">
                  <a className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product2?.category.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max0w0[30rem] max-h-[35rem]">
              {seledImg ? (
                <img
                  src={seledImg}
                  alt={product2?.title}
                  className="h-[25rem] w-[25rem] object-cover object-center"
                />
              ) : (
                <img
                  src={product2?.imageUrl}
                  alt={product2?.title}
                  className="h-[25rem] w-[25rem] object-cover object-center"
                />
              )}
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product2?.imageUrl?.map((e, i) => (
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
          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-width-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product2?.brand}
              </h1>
              <h1 className="text-lg lg:text-x1 text-gray-90 opacity-50 pt-1">
                {product2?.category.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className=" flex space-x-5 items-center text:lg lg:text-xl text-gray-900">
                <p className="font-semibold">{product2?.discountPrice}$</p>
                <p className="opacity-50 line-through">{product2?.price}$</p>
                <p className="text-green-600 font-semibold">
                  {" "}
                  {product2?.discountPercent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                <Rating name="half-rating-read" value={reviewAvg} precision={0.1} readOnly />
                  <p className="opacity-50 text-sm">
                    {reviews?.info.number} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-400">
                    {reviews?.info.number} Reviews
                  </p>
                </div>
              </div>
              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Size guide , quantity availabel ({product2?.quantity})
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product2?.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size.name}
                          disabled={size.quantity > 0 ? false : true}
                          className={({ active }) =>
                            classNames(
                              size.quantity > 0
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.quantity > 0 ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  className="mt-5"
                  sx={{ px: "3rem", py: "1rem", bgcolor: "#9155fd" }}
                >
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product2?.description}
                  </p>
                </div>
              </div>
              <section className=" mt-5">
                <Button
                  className="bg-red-500 opacity-50 py-2 mx-14"
                  onClick={() => setOpenReviewModal(true)}
                >
                  ADD REVIEW
                </Button>
                <Review
                  handleClose={handleClose}
                  open={openReviewModal}
                  product={product2}
                  handleCounter={handleCounter}
                />
              </section>
            </div>
          </div>
        </section>
        {/* Rating and Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">
            {" "}
            Recent Review & Rating
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {reviews?.rating.map((e, i) => (
                    <ProductReviewCard key={i} review={e} handleCounter={handleCounter}/>
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                <div className="flex items-center space-x-3 md:flex flex-col md:items-start">
                <Rating name="half-rating-read" value={reviewAvg} precision={0.1} readOnly />
                  <p className="opacity-60">{reviews?.info.number} Ratings</p>
                </div>
        
                <Box className={"mt-5 space-y-3"}>
                  <Grid container alignItems={"center"} gap={2}>
                    <Grid item xs={2}>
                      <p>excellent</p>
                    </Grid>
                    <Grid item xs={9}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        className="w-full"
                        variant="determinate"
                        value={reviews?.info.five}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  {/* //2 */}
                  <Grid container alignItems={"center"} gap={2}>
                    <Grid item xs={2}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={9}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        className="w-full"
                        variant="determinate"
                        value={reviews?.info.four}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  {/* //3 */}
                  <Grid container alignItems={"center"} gap={2}>
                    <Grid item xs={2}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={9}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={reviews?.info.three}
                      />
                    </Grid>
                  </Grid>
                  {/* //4 */}
                  <Grid container alignItems={"center"} gap={2}>
                    <Grid item xs={2}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={9}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        className="w-full"
                        variant="determinate"
                        value={reviews?.info.two}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                  {/* //5 */}
                  <Grid container alignItems={"center"} gap={2}>
                    <Grid item xs={2}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={9}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        className="w-full"
                        variant="determinate"
                        value={reviews?.info.one}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
        {/* similar roducts */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-5 md:flex justify-center">
            {data?.map((item, i) => (
              <HomeSectionCard product={item} key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
