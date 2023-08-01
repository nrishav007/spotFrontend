import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import SliderCard from "./SliderCard";
const CustomSlider = ({
  data,
  settings,
  text = false,
  h = "",
  mb = "",
  w = "",
}) => {
  const formatMinutesToTime = (minutes) => {
    const days = Math.floor(minutes / (24 * 60));
    let remainingMinutes = minutes % (24 * 60);
    const hours = Math.floor(remainingMinutes / 60);
    remainingMinutes %= 60;
    const formattedTime = `${days}d ${hours}h ${remainingMinutes}min`;
    return formattedTime;
  };

  return (
    <Slider {...settings}>
      {data.map(
        ({ djName, image, likeCount, totalEventDuration, totalGigs }) => {
          return (
            <SliderCard djName={djName} image={image} likeCount={likeCount} totalEventDuration={formatMinutesToTime(totalEventDuration)} totalGigs={totalGigs} />
          );
        }
      )}
    </Slider>
  );
};

export default CustomSlider;
