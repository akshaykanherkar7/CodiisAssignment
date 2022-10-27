import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../Components/AdminNavbar";
import { getPlansAPI } from "../Redux/Plan/plan.action";
import { uploadVideoAPI } from "../Redux/Video/video.action";
import {
  UPLOAD_VIDEO_FAI,
  UPLOAD_VIDEO_SUCC,
} from "../Redux/Video/video.actionTypes";

const Admin = () => {
  const { plans } = useSelector((state) => state.plan);
  console.log("plans:", plans);
  const dispatch = useDispatch();
  const toast = useToast();

  const [payload, setPayload] = useState({});

  const HandleOnchange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const HandleUploadVideo = (e) => {
    e.preventDefault();
    dispatch(uploadVideoAPI(payload)).then((res) => {
      if (res === UPLOAD_VIDEO_SUCC) {
        toast({
          title: "Video Successfully Uploaded.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (res === UPLOAD_VIDEO_FAI) {
        toast({
          title: "Failed to upload video",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getPlansAPI());
  }, []);
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <Flex
        minH={"70vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Upload Video/Links
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={HandleUploadVideo}>
              <Stack spacing={4}>
                {/* <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" name="fname" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" name="lname" />
                    </FormControl>
                  </Box>
                </HStack> */}
                <FormControl id="title" isRequired>
                  <FormLabel>Video Title</FormLabel>
                  <Input
                    type="string"
                    name="title"
                    value={payload.title}
                    onChange={HandleOnchange}
                  />
                </FormControl>
                <FormControl id="mobile" isRequired>
                  <FormLabel>Upload Video Link</FormLabel>
                  <Input
                    type="string"
                    name="video"
                    value={payload.video}
                    onChange={HandleOnchange}
                  />
                </FormControl>
                <FormControl id="category" isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={payload.category}
                    onChange={HandleOnchange}
                  >
                    <option value="">Select</option>
                    <option value="education">Educational</option>
                    <option value="comedy">Comedy</option>
                    <option value="science">Science</option>
                  </Select>
                </FormControl>
                <FormControl id="plan" isRequired>
                  <FormLabel>Plan</FormLabel>
                  <Select
                    name="plan"
                    value={payload.plan}
                    onChange={HandleOnchange}
                  >
                    <option value="">Select</option>
                    {plans.length > 0 &&
                      plans.map((el) => (
                        <option value={`${el._id}`}>{el.name}</option>
                      ))}
                  </Select>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Upload Video
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Admin;
