import React, { useEffect, useState } from "react";
import UserNav from "../../Components/UserNav";
import djBanner from "../../Assets/djBanner.png";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useToast,
  Modal,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RxDotsVertical } from "react-icons/rx";
import { BsFillCalendarEventFill, BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import {
  getUserDJList,
  getUserDJSearchList,
} from "../../Redux/AppReducer/Action";
import { useNavigate } from "react-router-dom";
import { DJDataShow } from "./UserNearbyDJS";
import axios from "axios";
import CustomSlider from "../../Components/CustomSlider";

const UserDjs = () => {
  var settings = {
    dots: true, // Show dots navigation
    infinite: true, // Enable infinite loop
    speed: 500, // Transition speed in milliseconds
    autoplaySpeed: 5000, // Time in milliseconds before sliding to the next one (5 seconds in this example)
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    arrows: true, // Show arrows navigation
    adaptiveHeight: true,
    pauseOnHover: false, // Pause autoplay when hovering over the slider
  };
  const [price, setPrice] = useState(10);
  const [location, setLocation] = useState(5);
  const [payload, setPayload] = useState({});
  const initSound = [
    {
      name: "Afrobeats",
      key: "sp1",
      active: false,
    },
    {
      name: "Rocks",
      key: "sp2",
      active: false,
    },
    {
      name: "Electronics",
      key: "sp3",
      active: false,
    },
    {
      name: "Hiphop",
      key: "sp4",
      active: false,
    },
    {
      name: "Reggea",
      key: "sp5",
      active: false,
    },
    {
      name: "Folk music",
      key: "sp6",
      active: false,
    },
    {
      name: "House music",
      key: "sp7",
      active: false,
    },
    {
      name: "Dance music",
      key: "sp8",
      active: false,
    },
    {
      name: "Tecno",
      key: "sp9",
      active: false,
    },
    {
      name: "Disco",
      key: "sp10",
      active: false,
    },
    {
      name: "Jazz",
      key: "sp11",
      active: false,
    },
    {
      name: "Pop",
      key: "sp12",
      active: false,
    },
  ];
  const [sound, setSound] = useState(initSound);
  const [star, setStar] = useState(0);
  const theme = useSelector((store) => store.app.theme);
  const load = useSelector((store) => store.app.isLoading);
  const token = useSelector((store) => store.auth.token);
  const djData = useSelector((store) => store.app.userDJList);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [DJWeek,setDJWeek]=useState([]);
  const handleSearchDJ = () => {
    const data = {
      pricing: price,
      rating1: star,
      rating2: 5,
    };
    const newPayload = { ...data, ...payload };
    dispatch(getUserDJSearchList(newPayload, token, toast));
    onClose();
  };
  const handleSingleDJ = (dj) => {
    navigate(`/user/singleDJ/${dj._id}`);
  };
  useEffect(() => {
    dispatch(getUserDJList(token, toast));
  }, [dispatch, toast, token]);
  useEffect(()=>{
    try {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/djOfWeek/display-dj-of-week`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res)=>{
        setDJWeek(res.data.data.djOfWeek);
      })
      .catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  },[])
  let genre = [
    "sp1",
    "sp2",
    "sp3",
    "sp4",
    "sp5",
    "sp6",
    "sp7",
    "sp8",
    "sp9",
    "sp10",
    "sp11",
    "sp12",
  ];

  const handlePref = (i) => {
    const tempS = [...sound];
    const tempP = { ...payload };
    if (tempS[i].active) {
      tempS[i].active = false;
      delete tempP[tempS[i].key];
    } else {
      tempS[i].active = true;
      tempP[tempS[i].key] = tempS[i].name;
    }
    setSound(tempS);
    setPayload(tempP);
  };
  const handlePrice = (newValue) => {
    setPrice(newValue);
  };
  const handleLocation = (newValue) => {
    setLocation(newValue);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <UserNav>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bgColor={theme === "light" ? "white" : "#111823"}
          color={theme === "light" ? "black" : "white"}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontSize={["14px", "18px", "20px", "24px"]}
              fontWeight={"600"}
            >
              Pricing
            </Text>
            <Slider
              colorScheme="orange"
              value={price}
              min={10}
              max={1000}
              onChange={handlePrice}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg={"orange"} />
            </Slider>
            <Flex justifyContent={"space-between"}>
              <Text>$10</Text>
              <Text>$1,000</Text>
            </Flex>
            <Text
              fontSize={["14px", "18px", "20px", "24px"]}
              fontWeight={"600"}
            >
              Location
            </Text>
            <Slider
              colorScheme="cyan"
              value={location}
              min={10}
              max={1000}
              onChange={handleLocation}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg={"cyan"} />
            </Slider>
            <Flex justifyContent={"space-between"}>
              <Text>5 miles</Text>
              <Text>100 miles</Text>
            </Flex>
            <Box
              p={"10px 0px"}
              mt={"10px"}
              bgColor={theme === "light" ? "#E0E0E0" : "#181D29"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                gap={"5px"}
                direction={["column", "column", "row", "row"]}
              >
                <enter>
                  <Text>Rating</Text>
                </enter>
                <Center>
                  <Box
                    fontSize={"30px"}
                    color={star >= 1 ? "#0086FF" : "gray.300"}
                    onClick={() => setStar(1)}
                  >
                    <AiFillStar />
                  </Box>
                  <Box
                    fontSize={"30px"}
                    color={star >= 2 ? "#0086FF" : "gray.300"}
                    onClick={() => setStar(2)}
                  >
                    <AiFillStar />
                  </Box>
                  <Box
                    fontSize={"30px"}
                    color={star >= 3 ? "#0086FF" : "gray.300"}
                    onClick={() => setStar(3)}
                  >
                    <AiFillStar />
                  </Box>
                  <Box
                    fontSize={"30px"}
                    color={star >= 4 ? "#0086FF" : "gray.300"}
                    onClick={() => setStar(4)}
                  >
                    <AiFillStar />
                  </Box>
                  <Box
                    fontSize={"30px"}
                    color={star >= 5 ? "#0086FF" : "gray.300"}
                    onClick={() => setStar(5)}
                  >
                    <AiFillStar />
                  </Box>
                </Center>
              </Flex>
            </Box>
            <Box
              m={"20px 0px"}
              p={"20px"}
              pr={"0px"}
              bgColor={theme === "light" ? "#E0E0E0" : "#181D29"}
            >
              <Center>
                <Text mb={"10px"}>Select Your Genre</Text>
              </Center>
              <SimpleGrid
                fontStyle={"normal"}
                columns={[1, 2, 3, 3]}
                gap={"20px"}
                fontSize={"14px"}
                mb={"20px"}
                fontWeight={"400"}
                fontFamily={"Roboto"}
              >
                {sound.map(({ name, active }, i) => {
                  return (
                    <Flex
                      key={i}
                      textAlign={"left"}
                      p={"10px 0px"}
                      cursor={"pointer"}
                      _hover={{ color: "blue.400" }}
                      color={active ? "blue.400" : "#B9B9B9"}
                      onClick={() => handlePref(i)}
                      gap={"5px"}
                    >
                      <Center>
                        <RiCheckboxMultipleFill />
                      </Center>
                      <Center
                        color={
                          active
                            ? "blue.400"
                            : theme === "light"
                            ? "black"
                            : "white"
                        }
                        _hover={{ color: "blue.400" }}
                      >
                        {name}
                      </Center>
                    </Flex>
                  );
                })}
              </SimpleGrid>
            </Box>
            <Center>
              <Button
                mb={"20px"}
                onClick={handleSearchDJ}
                mt={"20px"}
                variant={"unstyled"}
                bgColor={"#0086FF"}
                color={"white"}
                p={"0px 20px"}
                _hover={{}}
                borderRadius={"15px"}
              >
                Apply Filter
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box minH={"800px"} m={"20px"}>
        <Box ml={"10px"}>
        <CustomSlider settings={settings} data={DJWeek}  />
        </Box>
        <Flex justifyContent={"space-between"} mt={"40px"} mb={"10px"}>
          <Center>
            <Text
              color={theme === "light" ? "#3A3A3A" : "white"}
              textAlign={"left"}
              fontSize={"25px"}
              fontWeight={"600"}
            >
              Available Dj's
            </Text>
          </Center>
          <Center>
            <Box
              onClick={onOpen}
              cursor={"pointer"}
              color={theme === "light" ? "black" : "white"}
            >
              <TfiMenuAlt />
            </Box>
          </Center>
        </Flex>
        {load ? (
          <Center color={theme === "light" ? "black" : "white"}>
            Loading...
          </Center>
        ) : djData && djData.length <= 0 && load !== true ? (
          <Center color={theme === "light" ? "black" : "white"}>
            No DJ Found
          </Center>
        ) : (
          <>
            <SimpleGrid columns={[1, 1, 2, 3]} gap={"20px"}>
              {djData &&
                djData.length > 0 &&
                djData?.map((el, i) => {
                  return (
                    <DJDataShow
                      el={el}
                      i={i}
                      token={token}
                      genre={genre}
                      handleSingleDJ={handleSingleDJ}
                    />
                  );
                })}
            </SimpleGrid>
          </>
        )}
      </Box>
    </UserNav>
  );
};

export default UserDjs;
