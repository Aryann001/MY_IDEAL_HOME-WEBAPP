import React, { Fragment, useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import "./BrokerHouse.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminProductViewCardItem } from "./BrokerHouseViewCardItems";
import Loader from "../Layout/Loader/Loader";
import { clearErrors, getBrokerHouses } from "../../actions/houseAction";


export default function BrokerHouseView() {
  const dispatch = useDispatch();

  const { loading, error, houses } = useSelector(
    (state) => state.getBrokerHouse
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getBrokerHouses());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <Box
            minH={window.innerWidth <= Number(600) ? "40vh" : "100vh"}
            display={"flex"}
            flexDirection={window.innerWidth <= Number(767) ? "column" : "row"}
            bg={"gray.100"}
          >

            <Box
              maxW={{
                base: "3xl",
                lg: "7xl",
              }}
              mx="auto"
              px={{
                base: "4",
                md: "8",
                lg: "12",
              }}
              py={{
                base: "6",
                md: "8",
                lg: "12",
              }}
              backgroundColor={"white"}
              width={"100%"}
            >
              <Stack
                direction={{
                  base: "column",
                  lg: "row",
                }}
                align={{
                  lg: "flex-start",
                }}
                spacing={{
                  base: "8",
                  md: "16",
                }}
              >
                <Stack
                  spacing={{
                    base: "8",
                    md: "10",
                  }}
                  flex="2"
                >
                  <Heading fontSize="2xl" fontWeight="extrabold">
                    {`Houses`}
                  </Heading>

                  <Stack spacing="6">
                    {houses &&
                      houses.map((item) => (
                        <AdminProductViewCardItem key={item._id} {...item} />
                      ))}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}

