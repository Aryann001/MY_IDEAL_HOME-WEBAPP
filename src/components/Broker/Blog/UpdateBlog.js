import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  blogDetails,
  clearErrors,
  updateBlog,
} from "../../../actions/blogAction";
import useRunOnce from "../useRunOnce";

export default function UpdateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateBlogId } = useParams();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.brokerBlog
  );
  const {
    loading: bdLoading,
    error: bdError,
    blog,
  } = useSelector((state) => state.blogDetails);

  const [banner, setBanner] = useState();
  const [bannerPreview, setBannerPreview] = useState();
  const [title, setTitle] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [content, setContent] = useState("");

  const imageDataChange = (e) => {
    if (e.target.name === "banner") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerPreview(reader.result);
          setBanner(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const bannerSubmitHandler = (e) => {
    e.preventDefault();

    const bannerData = new FormData();

    bannerData.set(`title`, title);
    bannerData.set(`previewContent`, previewContent);
    bannerData.set(`content`, content);

    if (banner !== undefined) {
      bannerData.set(`image`, banner);
    }

    dispatch(updateBlog(updateBlogId, bannerData));
  };

  useRunOnce({
    fn: () => {
      dispatch(blogDetails(updateBlogId));
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (bdError) {
      toast.error(bdError);
      dispatch(clearErrors());
    }

    if (!bdLoading) {
      setTitle(blog.title);
      setPreviewContent(blog.previewContent);
      setContent(blog.content);
      setBannerPreview(blog.image && blog.image.url);
    }

    if (isUpdated) {
      navigate(`/broker/blog/blogs`);
      toast.success(`Blog Updated Successfully`);
      dispatch({ type: "UPDATE_BLOG_RESET" });
    }
  }, [dispatch, navigate, error, isUpdated, bdError, bdLoading, blog]);

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
                ? { height: "80vh" }
                : { height: "100vh" }
            }
          >
            <h1>Update Blog</h1>
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
                  name="previewContent"
                  placeholder="Preview Content"
                  value={previewContent}
                  onChange={(e) => setPreviewContent(e.target.value)}
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
                  name="content"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                  Choose Image For Blog
                </label>
                <Input
                  type="file"
                  accept="image/*"
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
                Update
              </Button>
            </form>
            <div className="preview">
              <Flex
                height={"60%"}
                width={"90%"}
                display={"flex"}
                overflow={"auto"}
              >
                <Image
                  alt={"Banner Preview Image"}
                  objectFit={"cover"}
                  src={bannerPreview}
                />
              </Flex>
            </div>
          </div>
        </div>
      </Box>

      <Footer />
    </Fragment>
  );
}
