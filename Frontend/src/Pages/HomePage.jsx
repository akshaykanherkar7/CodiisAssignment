import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

const HomePage = () => {
  return (
    <div>
      <Heading textAlign="center" color="gray" mb="10px" mt="10px">
        Video Streaming App
      </Heading>
      <Heading textAlign="center" color="brown" mb="30px" mt="10px">
        Login/Signup
      </Heading>
      <Tabs
        // border={"1px solid red"}
        w="70%"
        m="auto"
        isFitted
        variant="enclosed"
      >
        <TabList mb="1em">
          <Tab fontSize={"22px"}>Login</Tab>
          <Tab fontSize={"22px"}>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login></Login>
          </TabPanel>
          <TabPanel>
            <SignUp></SignUp>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HomePage;
