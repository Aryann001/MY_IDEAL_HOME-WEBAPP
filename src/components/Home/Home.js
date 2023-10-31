import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Loader from "../Layout/Loader/Loader";
import "./Home.css";
import { Heading, Link } from "@chakra-ui/react";
import Slider from "./Silder";
import HouseCard from "./HouseCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, homeHouses } from "../../actions/houseAction";
import {
  clearErrors as blogClearErrors,
  homeBlogs,
} from "../../actions/blogAction";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";

const Home = () => {
  const dispatch = useDispatch();

  const { error, loading, houses } = useSelector((state) => state.house);
  const {
    error: blogError,
    loading: blogLoading,
    blogs,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (blogError) {
      toast.error(blogError);
      dispatch(blogClearErrors());
    }

    dispatch(homeHouses());
    dispatch(homeBlogs());
  }, [dispatch, error, blogError]);

  return (
    <Fragment>
      <Header />

      <div className="firstContainer">
        <div>
          <div>
            <div className="fc1">
              <h1>Find Your Next Perfect Place with Ease</h1>
            </div>
            <div className="fc2">
              <p>
                My Ideal Home will help you find your home fast, easy and
                comfortable.
              </p>
              <p>Our expert support are always available.</p>
            </div>
            <div className="fc3">
              <Link href="/houses" color={"#4f7597"}>
                Let's Start Now...
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Slider />

      {loading ? (
        <Loader />
      ) : (
        <div className="houseContainer">
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textTransform={"uppercase"}
          >
            Some of Our House Offers
          </Heading>
          <div>
            {houses &&
              houses.map((house) => (
                <div key={house._id} className="subHouseContainer">
                  <HouseCard house={house} />
                </div>
              ))}
          </div>
        </div>
      )}

      {blogLoading ? (
        <Loader />
      ) : (
        <div className="blogContainer">
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textTransform={"uppercase"}
          >
            Some of Our Blogs
          </Heading>
          <div>{blogs && blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default Home;
