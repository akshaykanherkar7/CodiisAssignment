import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegisterAPI } from "../Redux/Auth/auth.action";
import { ERROR, REGISTER_SUCC } from "../Redux/Auth/auth.actionTypes";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({});
  const toast = useToast();
  const HandleOnchange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const dispatch = useDispatch();
  const { ErrorMsh } = useSelector((state) => state.auth);
  console.log("ErrorMsh:", ErrorMsh);

  const HandleSignup = (e) => {
    e.preventDefault();
    console.log(payload);
    dispatch(userRegisterAPI(payload)).then( (res) => {
      if (res === REGISTER_SUCC) {
         toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      if (res === ERROR) {
         toast({
          title: ErrorMsh,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };
  return (
    <Flex
      minH={"70vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={HandleSignup}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="fname"
                      value={payload.fname}
                      onChange={HandleOnchange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lname"
                      value={payload.lname}
                      onChange={HandleOnchange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={HandleOnchange}
                />
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={payload.phone}
                  onChange={HandleOnchange}
                />
              </FormControl>
              <FormControl id="Designation" isRequired>
                <FormLabel>Designation</FormLabel>
                <Select
                  name="role"
                  value={payload.role}
                  onChange={HandleOnchange}
                >
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                </Select>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={payload.password}
                    onChange={HandleOnchange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
