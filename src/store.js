import { configureStore } from "@reduxjs/toolkit";
import {
  deleteUserReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  brokerHouseReducer,
  getBrokerHouseReducer,
  houseDetailsReducer,
  houseReducer,
} from "./reducers/houseReducer";
import {
  blogDetailsReducer,
  blogReducer,
  brokerBlogReducer,
  getBrokerBlogReducer,
} from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
    house: houseReducer,
    houseDetails: houseDetailsReducer,
    blog: blogReducer,
    blogDetails: blogDetailsReducer,
    deleteUser: deleteUserReducer,
    brokerHouse: brokerHouseReducer,
    getBrokerHouse: getBrokerHouseReducer,
    brokerBlog: brokerBlogReducer,
    getBrokerBlog: getBrokerBlogReducer,
  },
});

export default store;
