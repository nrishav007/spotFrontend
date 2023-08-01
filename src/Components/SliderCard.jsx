import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoHeartCircle } from "react-icons/io5";

const SliderCard = ({
  djName,
  image,
  description,
  likeCount,
  totalEventDuration,
  totalGigs,
}) => {
  return (
    <Box
      as="div"
      borderRadius={"15px"}
      key={djName}
      style={{
        height: "250px",
        backgroundImage: `url(${
          image ||
          "https://i.ibb.co/kDf1ZRT/60826695-a9af-494b-89a0-7cb12cec1e6f.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box ml={"47%"} color={"white"}>
        <Text pt={"40px"}>DJ OF THE WEEK</Text>
        <Text mt={"20px"} fontWeight={"bold"}>
          {djName}
        </Text>
        <Text>{description}</Text>
        <Flex mt={"30px"}>
          <Box fontSize={"25px"}>
            <IoHeartCircle />
          </Box>
          <Text mr={"10px"} fontWeight={"bold"}>{likeCount} Likes</Text>
          <Center>
            <Box
              bgColor={"white"}
              borderRadius={"50%"}
              w={"8px"}
              h={"8px"}
            ></Box>
          </Center>
          <Text mr={"10px"}>{totalGigs}Gigs,</Text>
          <Text>{totalEventDuration}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SliderCard;
