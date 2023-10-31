import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader/Loader";
import { blogDetails, clearErrors } from "../../actions/blogAction";
import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import "./BlogDetails.css"

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text fontWeight="medium">{`By ${props.name}`}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { error, loading, blog } = useSelector((state) => state.blogDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(blogDetails(blogId));
  }, [dispatch, error, blogId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <div className="blogDetailsContainer">
            <div>
              <div className="bdc1">
                <Heading marginTop="1">
                  <Text
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {blog.title}
                  </Text>
                </Heading>
              </div>
              <div className="bdc2">
                <Text as="p" marginTop="2" color={"gray.700"} fontSize="lg">
                  {blog.previewContent}
                </Text>
              </div>
              <div className="bdc3">
                <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={blog.image && blog.image.url}
                    alt="blog"
                    objectFit="contain"
                  />
                </Box>
              </div>
              <div className="bdc4">
                <Text as="p" marginTop="2" fontSize="2xl">
                  {blog.content}
                </Text>
              </div>
              <div className="bdc5">
                <BlogAuthor
                  name={blog.author}
                  date={new Date(blog.createdAt)}
                />
              </div>
            </div>
          </div>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogDetails;
