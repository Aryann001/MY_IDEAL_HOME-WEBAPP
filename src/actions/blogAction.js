import axios from "axios";
import { server } from "../index";

export const homeBlogs =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: "HOME_BLOGS_REQUEST" });

      const { data } = await axios.get(`${server}/blogs/filter?page=${page}`, {
        withCredentials: true,
      });

      dispatch({ type: "HOME_BLOGS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "HOME_BLOGS_FAIL",
        payload: error.response.data.message,
      });
    }
  };

export const blogDetails = (blogId) => async (dispatch) => {
  try {
    dispatch({ type: "BLOG_DETAILS_REQUEST" });

    const { data } = await axios.get(`${server}/blog/${blogId}`, {
      withCredentials: true,
    });

    dispatch({ type: "BLOG_DETAILS_SUCCESS", payload: data.blog });
  } catch (error) {
    dispatch({
      type: "BLOG_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_BLOG_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/blog/create`,
      blogData,
      config
    );

    dispatch({ type: "CREATE_BLOG_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "CREATE_BLOG_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getBrokerBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BROKER_BLOGS_REQUEST" });

    const { data } = await axios.get(`${server}/getloggedinuserblogs`, {
      withCredentials: true,
    });

    dispatch({ type: "GET_BROKER_BLOGS_SUCCESS", payload: data.blogs });
  } catch (error) {
    dispatch({
      type: "GET_BROKER_BLOGS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_BLOG_REQUEST" });

    const { data } = await axios.delete(`${server}/blog/${blogId}`, {
      withCredentials: true,
    });

    dispatch({ type: "DELETE_BLOG_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_BLOG_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateBlog = (blogId, blogData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_BLOG_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/blog/${blogId}`,
      blogData,
      config
    );

    dispatch({ type: "UPDATE_BLOG_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_BLOG_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
