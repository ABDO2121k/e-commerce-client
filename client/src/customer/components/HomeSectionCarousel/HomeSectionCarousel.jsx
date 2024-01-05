import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSection/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import {useState } from "react";
const HomeSectionCarousel = ({data,sectionName}) => {
  const [activeIndex, setActive] = useState(0);
  const responsive = {
    0: { items: 1 },
    307: { items: 1 },
    360: { items: 1.2 },
    470: { items: 1.5 },
    530: { items: 1.7 },
    611: { items: 2 },
    720: { items: 2.3 },
    750: { items: 2.7 },
    1024: { items: 4.5 },
  };



  const slideNext = () => setActive(activeIndex+1);
  const slidePrev = () => setActive(activeIndex-1);
  const syncActive = ({ item }) => {
    setActive(item);
  };
  const items = data.map((item, e) => <HomeSectionCard key={e} product={item} />);
  return (
    <div className="border">
    <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5 ">
        <AliceCarousel
          items={items}
            mouseTracking
            keyboardNavigation
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChange={syncActive}
          activeIndex={activeIndex}
        />
        {activeIndex < items.length - 4 && (
          <Button
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
              color: "black",
            }}
            aria-labelledby="next"
            onClick={slideNext}
          >
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
        {activeIndex != 0 && (
          <Button
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "white",
              color: "black",
            }}
            aria-labelledby="next"
            onClick={slidePrev}
          >
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
