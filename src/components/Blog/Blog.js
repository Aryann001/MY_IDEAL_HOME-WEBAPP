import React, { Fragment, useEffect, useState } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, homeBlogs } from "../../actions/blogAction";
import { Heading } from "@chakra-ui/react";
import BlogCard from "../Home/BlogCard";
import Pagination from "react-js-pagination";
import "../House/House.css";

const Blog = () => {
  const dispatch = useDispatch();

  const { error, loading, blogs, blogCount, resultPerPage } =
    useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    window.scrollTo(0, 0);
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(homeBlogs(currentPage));
  }, [dispatch, error, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <div className="blogContainer">
            <Heading
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={500}
              textTransform={"uppercase"}
              borderBottom={"1px solid black"}
            >
              Blogs
            </Heading>
            <div>
              {blogs &&
                blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          </div>

          {resultPerPage < blogCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={blogCount}
                onChange={setCurrentPageNo}
                nextPageText=">"
                prevPageText="<"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Blog;
