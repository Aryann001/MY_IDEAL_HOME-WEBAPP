import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import ImageSlider from "./ImageSilder";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, houseDetails } from "../../actions/houseAction";
import { ImLocation as LocationIcon } from "react-icons/im";
import toast from "react-hot-toast";
import { Heading, Text } from "@chakra-ui/react";
import "./HouseDetails.css";
import Loader from "../Layout/Loader/Loader";

const HouseDetails = () => {
  const { houseId } = useParams();
  const dispatch = useDispatch();

  const { error, loading, house } = useSelector((state) => state.houseDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(houseDetails(houseId));
  }, [dispatch, error, houseId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <ImageSlider images={house.images} />

          <div className="dc">
            <div className="dcgrid">
              <div>
                <div className="dcgrid1-1">
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                    textTransform={"uppercase"}
                  >
                    {house.title}
                  </Heading>
                </div>
                <div className="dcgrid1-2">
                  <LocationIcon />
                  <Text color={"gray.500"} fontSize={"sm"}>
                    {house.address}
                  </Text>
                </div>
                <div className="dcgrid1-3">
                  <Text
                    fontFamily={"body"}
                    color={"green.500"}
                    fontWeight={"bold"}
                    fontSize={"m"}
                  >
                    {`For ${house.type}`}
                  </Text>
                </div>
                <div className="dcgrid1-3">
                  <Text fontFamily={"body"} fontWeight={"bold"} fontSize={"sm"}>
                    Description -{" "}
                  </Text>
                  <Text fontFamily={"body"} fontSize={"sm"}>
                    {house.description}
                  </Text>
                </div>
                <div className="dcgrid1-4">
                  <Text
                    fontWeight={"400"}
                    textTransform={"uppercase"}
                  >{`${house.bedrooms} Beds`}</Text>
                  <Text
                    fontWeight={"400"}
                    textTransform={"uppercase"}
                  >{`${house.bathrooms} Baths`}</Text>
                  <Text fontWeight={"400"} textTransform={"uppercase"}>
                    {house.furnished ? `Furnished` : "Not Furnished"}
                  </Text>
                  <Text fontWeight={"400"} textTransform={"uppercase"}>
                    {house.parking ? `Parking` : "No Parking"}
                  </Text>
                </div>
              </div>
              {/*  */}
              <div>
                <div>
                  <iframe
                    title="map"
                    src={house.location}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HouseDetails;
