import React from "react";
import herobanner from "../assets/flat-design-fast-food-sale-banner.png";

const Banner = () => {
  return (
    <div>
      <img
        src={herobanner}
        alt="Fast food banner"
        className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
      />
    </div>
  );
};

export default Banner;
