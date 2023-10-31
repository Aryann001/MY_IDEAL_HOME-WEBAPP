import React, { Fragment } from "react";
import { Box, useColorModeValue, Button } from "@chakra-ui/react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import "./BrokerHouse.css";
import { useNavigate } from "react-router-dom";

export default function BrokerHouse() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Header />

      <Box
        minH={window.innerWidth <= Number(600) ? "40vh" : "100vh"}
        display={"flex"}
        flexDirection={window.innerWidth <= Number(767) ? "column" : "row"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <div className="banner">
          <div className="contactContainer">
            <h1>House</h1>
            <div className="BBtnDiv">
              <Button
                backgroundColor={"#4f7597"}
                color={"white"}
                transition={"all 0.5s"}
                _hover={{ backgroundColor: "#145e83" }}
                variant={"solid"}
                width={"50%"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/broker/house/create`);
                }}
              >
                Create House Listing
              </Button>
            </div>
            <div className="BBtnDiv">
              <Button
                backgroundColor={"#4f7597"}
                color={"white"}
                transition={"all 0.5s"}
                _hover={{ backgroundColor: "#145e83" }}
                variant={"solid"}
                width={"50%"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/broker/house/houses`);
                }}
              >
                View My Houses
              </Button>
            </div>
          </div>
        </div>
      </Box>

      <Footer />
    </Fragment>
  );
}
