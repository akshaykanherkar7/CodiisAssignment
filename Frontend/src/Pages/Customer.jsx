import { Box, Button, Grid, Heading, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../Components/CustomerNavbar";
import { getPlansAPI } from "../Redux/Plan/plan.action";
import {
  getPurPlanAPI,
  purchasePlanAPI,
} from "../Redux/PurchasePlan/pplan.action";
import {
  PURCHASE_PLAN_FAI,
  PURCHASE_PLAN_SUCC,
} from "../Redux/PurchasePlan/pplan.actionTypes";

const Customer = () => {
  const { userData } = useSelector((state) => state.auth);
  const { plans } = useSelector((state) => state.plan);
  const { purchasedplan } = useSelector((state) => state.pplan);
  console.log("purchasedplan:", purchasedplan);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const HandlePurchasePlan = (id) => {
    const payload = {
      plan: id,
      admin: userData._id,
    };
    dispatch(purchasePlanAPI(payload)).then((res) => {
      if (res === PURCHASE_PLAN_SUCC) {
        toast({
          title: "Plan Successfully Purchased.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/cvideo");
      }
      if (res === PURCHASE_PLAN_FAI) {
        toast({
          title: "Failed to Purchase Plan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getPlansAPI());
    dispatch(getPurPlanAPI());
  }, []);

  const checkPurchasedOrNot = (id) => {
    console.log(id);
    // let count = 0;
    for (let i = 0; i < purchasedplan.length; i++) {
      if (id === purchasedplan[i].plan) {
        return "Allready Purchased";
      }
    }
    // if (count === 1) {
    //   return "Allready Purchased";
    // } else {
    return "Purchase Plan";
    // }
  };
  return (
    <div>
      <CustomerNavbar></CustomerNavbar>
      <Heading textAlign={"center"} color="brown" mt="5px">
        Plans Detail
      </Heading>
      <Box h="650px">
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
                  <Box p="5px">
                    <Button
                      m="auto"
                      display="block"
                      colorScheme={"teal"}
                      onClick={() => HandlePurchasePlan(el._id)}
                    >
                      {checkPurchasedOrNot(el._id)}
                    </Button>
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Customer;
