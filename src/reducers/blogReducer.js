import { createReducer } from "@reduxjs/toolkit";

export const blogReducer = createReducer(
  { blogs: [] },
  {
    HOME_BLOGS_REQUEST: (state, action) => {
      state.loading = true;
    },
    HOME_BLOGS_SUCCESS: (state, action) => {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.blogCount = action.payload.blogCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    HOME_BLOGS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);


export const blogDetailsReducer = createReducer(
  { blog: {} },
  {
    BLOG_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    BLOG_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    },
    BLOG_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const brokerBlogReducer = createReducer(
  {},
  {
    //CREATE
    CREATE_BLOG_REQUEST: (state, action) => {
      state.loading = true;
    },
    CREATE_BLOG_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    CREATE_BLOG_RESET: (state, action) => {
      state.success = false;
    },
    CREATE_BLOG_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    //UPDATE
    UPDATE_BLOG_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_BLOG_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_BLOG_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_BLOG_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    //DELETE
    DELETE_BLOG_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_BLOG_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_BLOG_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_BLOG_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const getBrokerBlogReducer = createReducer(
  { blogs: [] },
  {
    GET_BROKER_BLOGS_REQUEST: (state, action) => {
      state.loading = true;
    },
    GET_BROKER_BLOGS_SUCCESS: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    GET_BROKER_BLOGS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);