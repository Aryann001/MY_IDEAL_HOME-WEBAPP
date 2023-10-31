import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Input,
  Image,
  Select,
} from "@chakra-ui/react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, createHouse } from "../../actions/houseAction";

const categories = ["Rent", "Sale"];

export default function CreateHouseListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.brokerHouse);

  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [pincode, setPincode] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [category, setCategory] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const imageDataChange = (e) => {
    const files = Array.from(e.target.files);

    setBanner([]);
    setBannerPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerPreview((old) => [...old, reader.result]);
          setBanner((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const bannerSubmitHandler = (e) => {
    e.preventDefault();

    const bannerData = new FormData();

    bannerData.set(`title`, title);
    bannerData.set(`description`, description);
    bannerData.set(`address`, address);
    bannerData.set(`location`, location);
    bannerData.set(`price`, price);
    bannerData.set(`discountedPrice`, discountedPrice);
    bannerData.set(`pincode`, pincode);
    bannerData.set(`bedrooms`, bedrooms);
    bannerData.set(`bathrooms`, bathrooms);
    bannerData.set(`type`, category);
    bannerData.set(`contactInfo`, contactInfo);

    banner.forEach((image) => {
      bannerData.append(`images`, image);
    });

    dispatch(createHouse(bannerData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate(`/broker/house`);
      toast.success(`House Created Successfully`);
      dispatch({ type: "CREATE_HOUSE_RESET" });
    }
  }, [dispatch, navigate, error, success]);

  return (
    <Fragment>
      <Header />

      <Box
        minH="100vh"
        display={"flex"}
        flexDirection={window.innerWidth <= Number(767) ? "column" : "row"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <div className="banner">
          <div
            className="contactContainer bannerContainer createProduct"
            style={
              window.innerWidth <= Number(600)
                ? { height: "120vh" }
                : { height: "160vh" }
            }
          >
            <h1>Create House Listing</h1>
            <form
              encType="multipart/form-data"
              className="contactForm"
              style={{ height: "100%" }}
              onSubmit={bannerSubmitHandler}
            >
              <div>
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="descriptions"
                  placeholder="Descriptions"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="discountedPrice"
                  placeholder="Discounted Price"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Select
                  placeholder="Select Type"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  marginRight={"0.2vmax"}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                >
                  {categories &&
                    categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </Select>
                <Input
                  type="number"
                  name="pincode"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="bedrroms"
                  placeholder="Bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
                <Input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="contactInfo"
                  placeholder="Contact Email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                />
              </div>

              <div className="inputFileBtn">
                <label
                  htmlFor="inputFile"
                  className="inputFile"
                  style={
                    window.innerWidth <= Number(600)
                      ? { fontSize: "2.2vmax" }
                      : null
                  }
                >
                  Choose House Images
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  name="banner"
                  onChange={imageDataChange}
                  id="inputFile"
                  visibility={"hidden"}
                />
              </div>

              <Button
                isDisabled={loading ? true : false}
                colorScheme="blue"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                width="full"
                id="createProductBtn"
                type="submit"
                padding={
                  window.innerWidth <= Number(600) ? "2vmax 0" : "1vmax 0"
                }
              >
                Create
              </Button>
            </form>
            <div className="preview">
              <Flex
                height={"60%"}
                width={"90%"}
                display={"flex"}
                overflow={"auto"}
              >
                {bannerPreview &&
                  bannerPreview.map((image, index) => (
                    <Image
                      key={index}
                      alt={"Banner Preview Image"}
                      objectFit={"cover"}
                      src={image}
                    />
                  ))}
              </Flex>
            </div>
          </div>
        </div>
      </Box>

      <Footer />
    </Fragment>
  );
}
