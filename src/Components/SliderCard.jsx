import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoHeartCircle } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
const SliderCard = ({
  djName,
  image,
  description,
  likeCount,
  totalEventDuration,
  rating,
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
      <Flex flexDirection={"row-reverse"} pr={"40px"} m={0}  position={"relative"} top={-3} right={0}>
          <Box fontSize={"80px"} ml={"-15px"} color={"#FEA801"}>
            <FaBookmark />
          </Box>
          <Box position={"relative"} color={"white"} top={5} left={12}>
            <Flex gap={"5px"} flexDirection={"row-reverse"} fontSize={"8px"} textAlign={"right"}>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
            </Flex>
            <Center>
            <Text>{rating ||"4.0"}</Text>
            </Center>
          </Box>
        </Flex>
      <Box ml={"47%"}mt={"-40px"} color={"white"}>
        
        <Text pt={"40px"}>DJ OF THE WEEK</Text>
        <Text mt={"20px"} fontWeight={"bold"}>
          {djName}
        </Text>
        <Text>{description}</Text>
        <Flex mt={"30px"}>
          {/* like */}
          {/* <Box fontSize={"25px"}>
            <IoHeartCircle />
          </Box>
          <Text mr={"10px"} fontWeight={"bold"}>{likeCount} Likes</Text> */}
          <Center>
            <Box mr={"5px"}
              bgColor={"white"}
              borderRadius={"50%"}
              w={"5px"}
              h={"5px"}
            ></Box>
          </Center>
          <Text mr={"5px"}>{totalGigs}Gigs,</Text>
          <Text>{totalEventDuration}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SliderCard;
