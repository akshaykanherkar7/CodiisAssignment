import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
import EditModal from "../Components/EditModal";
import {
  addPlanAPI,
  deletePlanAPI,
  getPlansAPI,
} from "../Redux/Plan/plan.action";
import { ADD_PLAN_FAI, ADD_PLAN_SUCC } from "../Redux/Plan/plan.actionTypes";

const Plan = () => {
  const { userData } = useSelector((state) => state.auth);
  const { plans } = useSelector((state) => state.plan);

  const [payload, setPayload] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  const HandleOnchange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const HandleAddPlan = (e) => {
    e.preventDefault();
    dispatch(addPlanAPI(payload)).then((res) => {
      if (res === ADD_PLAN_SUCC) {
        toast({
          title: "Plan Successfully Added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      if (res === ADD_PLAN_FAI) {
        toast({
          title: "Failed to Add Plan",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      dispatch(getPlansAPI());
    });
  };

  const HandleDeletePlan = (id) => {
    dispatch(deletePlanAPI(id)).then((res) => {
      dispatch(getPlansAPI());
    });
  };

  useEffect(() => {
    dispatch(getPlansAPI());
  }, []);

  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <Heading color={"brown"} textAlign="center" mt="5px">
        Plan Section
      </Heading>

      <Box mt="10px" border={"1px solid red"} h="700px">
        <Flex gap="10px">
          <Box width="25%" border="1px solid black" h="650px">
            <Flex
              minH={"70vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                    Add New Plan
                  </Heading>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <form onSubmit={HandleAddPlan}>
                    <Stack spacing={4}>
                      <FormControl id="email" isRequired>
                        <FormLabel>Plan Name</FormLabel>
                        <Input
                          type="string"
                          name="name"
                          value={payload.name}
                          onChange={HandleOnchange}
                        />
                      </FormControl>
                      <FormControl id="price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input
                          type="number"
                          name="price"
                          value={payload.price}
                          onChange={HandleOnchange}
                        />
                      </FormControl>

                      <FormControl id="Designation" isRequired>
                        <FormLabel>Months</FormLabel>
                        <Select
                          name="months"
                          value={payload.months}
                          onChange={HandleOnchange}
                        >
                          <option value="">Select</option>
                          <option value="3month">3 Months</option>
                          <option value="6month">6 Months</option>
                          <option value="9month">9 Months</option>
                          <option value="12month">12 Months</option>
                        </Select>
                      </FormControl>
                      <FormControl id="adminid" isRequired>
                        <FormLabel>Admin ID</FormLabel>
                        <Select
                          name="admin"
                          value={payload.admin}
                          onChange={HandleOnchange}
                        >
                          <option value="">Select</option>
                          <option value={`${userData._id}`}>
                            {userData._id}
                          </option>
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
                          Add Plan
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </Flex>
          </Box>
          <Box width="75%" border="1px solid black" h="650px">
            <Box
              border="box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
              width={"95%"}
              m="auto"
              mt="20px"
              h={"600px"}
            >
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {plans.length > 0 &&
                  plans.map((el) => (
                    <Box
                      key={el.id}
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      borderColor={"teal"}
                      padding="8px"
                    >
                      <Heading
                        textAlign={"center"}
                        fontSize="26px"
                        mt="3px"
                        color={"teal"}
                        mb="-5px"
                      >
                        {el.name}
                      </Heading>
                      <Box p="6">
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="16px"
                            textTransform="uppercase"
                            ml="2"
                          >
                            Price: {el.price}
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="16px"
                            textTransform="uppercase"
                            ml="2"
                          >
                            Duration: {el.months}
                          </Box>
                        </Box>
                      </Box>
                      <Box p="9px">
                        <Flex justifyContent={"space-evenly"}>
                          <DeleteIcon
                            onClick={() => HandleDeletePlan(el._id)}
                            fontSize={"18px"}
                            cursor={"pointer"}
                          ></DeleteIcon>
                          {/* <EditIcon
                            fontSize={"18px"}
                            cursor={"pointer"}
                          ></EditIcon> */}
                          <EditModal el={el}></EditModal>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
              </Grid>
            </Box>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Plan;
