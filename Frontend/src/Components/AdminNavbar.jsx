import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../Redux/Auth/auth.action";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const HandleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Box border="1px solid gray" h="60px" backgroundColor={"teal"}>
      <Flex justifyContent={"space-evenly"} alignItems="center" mt="10px">
        <Text color={"white"} cursor={"pointer"} fontSize={"22px"}>
          <Link to="/admin">Video Section</Link>
        </Text>
        <Text color={"white"} cursor="pointer" fontSize={"22px"}>
          <Link to="/plan"> Plan Section</Link>
        </Text>
        <Button
          colorScheme={"green"}
          cursor="pointer"
          fontSize={"22px"}
          onClick={HandleLogOut}
        >
          <Link to="/">Logout</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;
