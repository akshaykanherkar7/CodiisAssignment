import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../Redux/Auth/auth.action";
import { ERROR, LOGIN_SUCC } from "../Redux/Auth/auth.actionTypes";

const Login = () => {
  const [payload, setPayload] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  console.log("userData:", userData);
  const HandleOnchange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(payload);
    dispatch(userLoginAPI(payload)).then((res) => {
      if (res === LOGIN_SUCC) {
        toast({
          title: "Login Successfull.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // if (userData.role === "Customer") {
        //   console.log("Admin");
        //   setTimeout(() => {
        //     navigate("/admin");
        //   }, 3000);
        // } else {
        //   console.log("Customer");
        //   setTimeout(() => {
        //     navigate("/customer");
        //   }, 3000);
        // }
      }
      if (res === ERROR) {
        toast({
          title: "Invalid Credentiels",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };
  if (userData.role === "Admin") {
    navigate("/admin");
  } else if (userData.role === "Customer") {
    navigate("/customer");
  }

  return (
    <Flex
      minH={"70vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleLogin}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={HandleOnchange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={payload.password}
                  onChange={HandleOnchange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
