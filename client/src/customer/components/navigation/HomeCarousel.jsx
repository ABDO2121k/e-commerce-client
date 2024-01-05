import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { dataCarousel } from "./CarouselData";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/authContext";

const HomeCarousel = () => {
  const auth = useContext(authContext);
  const [images, setImages] = useState();

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await auth?.getNews();
        return setImages(res);
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
  }, []);

  const items = images?.imageURls.map((item, i) => (
    <img key={i} src={item} className="cursor-pointer" role="presentation" />
  ));
  return (
    <>
      {console.log("images",images)}
      <AliceCarousel
        autoPlay
        disableButtonsControls
        autoPlayInterval={3500}
        infinite
        items={items}
      />{" "}
    </>
  );
};

export default HomeCarousel;
