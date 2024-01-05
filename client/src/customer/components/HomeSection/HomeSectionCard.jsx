import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { Skeleton } from "@mui/material";

const HomeSectionCard = ({ product }) => {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const [laFamille, setLafammile] = useState();
  const handleNavigate = () => {
    if (location.pathname == "/") {
      navigate(
        `${laFamille[0].name}/${laFamille[1].name}/${product.category.name}`
      );
    } else {
      navigate(`/product/${product?._id}`);
    }
  };

  useEffect(() => {
    const JibFamiile = async () => {
      try {
        const data = product?.category?.name;
        const res = await auth?.BahaWjdha(data);
        setLafammile(res.categories);
      } catch (err) {
        console.log(err.message);
      }
    };
    JibFamiile();
  }, []);
  return (
    <>
      {laFamille != undefined ? (
        <div
          className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border"
          onClick={handleNavigate}
        >
          <div className="h-[13rem] w-[10rem]">
            <img
              className="object-cover object-top w-full h-full"
              src={product.imageUrl}
              alt=""
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              {product.brand}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{product.title}</p>
            <div className=" flex space-x-5 items-center text:lg lg:text-xl text-gray-900">
              <p className="font-semibold text-sm">{product?.price}$</p>
              <p className="opacity-50 line-through text-sm">
                {product?.discountPrice}$
              </p>
              <p className="text-green-600 font-semibold text-sm">
                {" "}
                {product?.discountPercent}% off
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  );
};

export default HomeSectionCard;
