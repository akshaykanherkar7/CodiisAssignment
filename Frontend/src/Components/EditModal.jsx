import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlansAPI, updatePlanAPI } from "../Redux/Plan/plan.action";

const EditModal = ({ el }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [payload, setPayload] = useState({});
  const dispatch = useDispatch();

  const HandleOnchange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  useEffect(() => {
    payload.name = el.name;
    payload.price = el.price;
    payload.months = el.months;
    payload.admin = el.admin;
  }, [el]);

  const HandleUpdatePlan = (e) => {
    e.preventDefault();
    dispatch(updatePlanAPI(el._id, payload))
    onClose();
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <EditIcon
        fontSize={"18px"}
        cursor={"pointer"}
        onClick={onOpen}
      ></EditIcon>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Plan Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Flex
                minH={"70vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                  <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <form onSubmit={HandleUpdatePlan}>
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
                            <option value={`${el._id}`}>{el._id}</option>
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
                            Update Plan
                          </Button>
                        </Stack>
                      </Stack>
                    </form>
                  </Box>
                </Stack>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
